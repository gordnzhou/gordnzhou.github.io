import './ThemeChanger.css';
import React, { useState } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// cache API responses in case prompts are reused
const cache = {}

const ThemeChanger = () => {
    const [textInput, setTextInput] = useState('');
    const [themePrompt, setThemePrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleInputChange = (e) => {
        setErrorMsg("");
        setTextInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        if (!textInput) {
            setErrorMsg("Prompt cannot be empty.");
            setLoading(false);
            return;
        }

        changeTheme(textInput);
    };

    const changeTheme = async (prompt) => {
        let data = cache[prompt.toLowerCase()];

        if (!data) {
            try {
                setLoading(true);
                const params = new URLSearchParams({ prompt });
                const response = await fetch(`${BACKEND_URL}/theme-gen?${params.toString()}`);
    
                if (!response || !response.ok) {
                    throw new Error(`Backend error: ${await response.text()}`);
                }
    
                data = await response.json();

                setLoading(false);
                cache[prompt.toLowerCase()] = data;
                console.log(data);
            } catch (e) {
                setErrorMsg("Unable to find a theme :(")
                setLoading(false);
                console.error("Request failed:", e);
                return;
            }
        }

        document.documentElement.style.setProperty('--bg-color', data["bg-color"]);
        document.documentElement.style.setProperty('--secondary-bg', data["secondary-bg"]);
        document.documentElement.style.setProperty('--accent-color', data["accent-color"]);
        document.documentElement.style.setProperty('--text-color', data["text-color"]);
        setThemePrompt(`${prompt} ${data["emoji"] || ""}`);
    }

    return (
        <>
        <label for="theme-prompt-input">
            <h3>{themePrompt ? ("Website Theme: "  + themePrompt ) : "Don't like the colours? Give it a new look"}</h3>     
            Describe a theme, then the website will change colours to try and match that theme.
        </label>
        <div class="input-container">
            <input
                class="theme-prompt-input"
                type="text"
                onChange={handleInputChange}
                placeholder="Describe a Theme"
            />
            <button class="button-main" onClick={handleSubmit}>Confirm {loading && <span className="spinner" aria-label="Loading..."></span>} </button>
        </div>
        <div class="suggestions-container">
            <button class="button-main" onClick={() => changeTheme("sunny light")}>sunny light ☀️</button>
            <button class="button-main" onClick={() => changeTheme("space dark")}>space dark 🌌</button>
            <button class="button-main" onClick={() => changeTheme("cherry blossoms")}>cherry blossoms 🌸</button>
        </div>
        { errorMsg && <p class="error-message">Error: {errorMsg}</p>}
        </>
    )
}

export default ThemeChanger;