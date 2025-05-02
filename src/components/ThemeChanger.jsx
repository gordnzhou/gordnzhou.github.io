import './ThemeChanger.css';
import axios from 'axios';
import React, { useState } from 'react';

const prompt = 'Generate a color palette for a retro 80s synthwave theme';

const ThemeChanger = () => {
    const [textInput, setTextInput] = useState('');
    const [themePrompt, setThemePrompt] = useState('');

    const handleInputChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleSubmit = (e) => {
        setThemePrompt(textInput);
        axios.get('http://colormind.io/api/', {
        params: {
            model: 'default',
        }
        })
        .then(response => {
            console.log(response.data); 
        })
        .catch(error => {
            console.error(error);
        });
    };

    const toggleTheme = () => {
        document.documentElement.style.setProperty('--bg-color', '#2e2b29');
        document.documentElement.style.setProperty('--secondary-bg', '#3b3734');
        document.documentElement.style.setProperty('--accent-color', '#a67b5b');
        document.documentElement.style.setProperty('--text-color', '#eae6df');
    };

    return (
        <>
        <button onClick={toggleTheme}>Change Theme</button>
        <label for="theme-prompt-input">
            <h3>{themePrompt ? ("Your theme: " + themePrompt) : "Don't like the colours? Give it a new look"}</h3>     
            Describe a theme, then the website will change colours to try and match that theme.
        </label>
        <div class="input-container">
            <input
                class="theme-prompt-input"
                type="text"
                onChange={handleInputChange}
                placeholder="ex: Dark Academia Vibe"
            />
            <button class="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}

export default ThemeChanger;