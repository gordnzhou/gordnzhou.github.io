const CORS_HEADERS = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

const GEMINI_CONTEXT = "Generate a JSON object with four fields: accent-color, bg-color, secondary-bg, and text-color. Each field contains valid HEX colors. Base it on the following description: ";
const PALETTE_REGEX = `\{*\"accent-color\"*:*\".+?\"*,*\"bg-color\"*:*\".+?\"*,*"secondary-bg\"*:*\".+?\"*,*\"text-color\"*:*\".+?\"*\}`;
  
export default async function themeGen(request, env) {
    const url = new URL(request.url);
    const prompt = url.searchParams.get("prompt");

    if (!prompt) {
        return new Response("Missing 'prompt' query parameter.", { status: 400, headers: CORS_HEADERS });
    }

    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`;

    try {
        const geminiPrompt = GEMINI_CONTEXT + prompt;
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: geminiPrompt }]}]})
        })

        if (!response || !response.ok) {
            throw new Error(`Backend error: ${await response.text()}`);
        }

        const responseJson = await response.json();
        const paletteText = responseJson["candidates"][0]["content"]["parts"][0]["text"].replace(/\s+/g, '');
        const paletteJson = JSON.parse(paletteText.match(PALETTE_REGEX)[0]);

        return new Response(JSON.stringify(paletteJson), {
            status: 200,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
    } catch (err) {
        return new Response("Unable to generate a colour palette based on prompt.", { status: 400, headers: CORS_HEADERS });
    }
}