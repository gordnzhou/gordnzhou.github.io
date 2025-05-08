const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

const LIGHT_THRESHOLD = 0.179;

function getLuminance(hex) {
    const rgb = hex.replace('#', '').match(/.{2}/g).map(c => parseInt(c, 16) / 255);
    const [r, g, b] = rgb.map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
  
function blendColors(hexA, hexB, tintFactor = 0.2) {
    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        const bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    };
  
    // Helper function to convert RGB to hex
    const rgbToHex = ({ r, g, b }) => {
        const toHex = (c) => {
            const hex = Math.round(c).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
  
    const rgbA = hexToRgb(hexA);
    const rgbB = hexToRgb(hexB);
    const blendedRgb = {
      r: (1 - tintFactor) * rgbA.r + tintFactor * rgbB.r,
      g: (1 - tintFactor) * rgbA.g + tintFactor * rgbB.g,
      b: (1 - tintFactor) * rgbA.b + tintFactor * rgbB.b
    };
  
    return rgbToHex(blendedRgb);
}
  
export default async function themeGen(request) {
    const url = new URL(request.url);
    const prompt = url.searchParams.get("prompt");

    if (!prompt) {
        return new Response(JSON.stringify({ error: "Missing 'prompt' query parameter." }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
    }

    const response = await fetch(`https://colormagic.app/api/palette/search?q=${encodeURIComponent(prompt)}`);

    if (!response.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch data from ColorMagic API." }), {
            status: response.status,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
    }

    const palettes = await response.json();

    if (palettes.length === 0) {
        return new Response(JSON.stringify({ error: "No palettes found for given prompt." }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
    }

    const palette = palettes[0]["colors"];

    // sorts colours from darkest to lightest
    let sortedPalette = palette
        .map(color => ({ color, luminance: getLuminance(color) }))
        .sort((a, b) => a.luminance - b.luminance);

    const avgLuminance = palette.reduce((acc, color) => {
        return acc + getLuminance(color);
    }, 0) / palette.length;

    // switch to light theme (bright bg, dark text) if palette is "bright"
    if (avgLuminance > LIGHT_THRESHOLD) {
        sortedPalette.reverse();
    }

    const colours = {
        "bg-color": sortedPalette[0].color, 
        "secondary-bg": blendColors(sortedPalette[0].color, sortedPalette[Math.ceil(sortedPalette.length / 2)].color),
        "accent-color": blendColors(sortedPalette[Math.ceil(sortedPalette.length / 2)].color ,
            avgLuminance > LIGHT_THRESHOLD ? "#FFFFFF" : "#000000", 0.2), 
        "text-color": sortedPalette[sortedPalette.length - 1].color,
        "theme": avgLuminance > LIGHT_THRESHOLD ? "light" : "dark",
        "prompt": prompt,
    };

    return new Response(JSON.stringify(colours), {
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
}