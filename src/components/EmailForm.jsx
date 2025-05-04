import "./EmailForm.css";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EmailForm = () => {
    const [inputs, setInputs] = useState("");
    const [formError, setFormError] = useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
        setFormError('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = inputs["email"];
        const content = inputs["content"];

        if (content == "") {
            setFormError("Content must be non-empty");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            setFormError("Please enter a valid email address");
            return;
        }

        let response = await fetch(`${BACKEND_URL}/send-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, content }),
        });

        const text = await response.text();
        if (response.ok) {
            alert(`Message sent!\nAnonymous: ${email ? "No" : "Yes"}\nEmail: ${email || "(empty)"}`);
            console.log(text, email, content);
        } else {
            console.error("Worker Error:", text);
        }
    }

    return (
        <div class="email-form-container">
            <form id="emailForm" onSubmit={handleSubmit}>
                <p>Do you have any questions or comments, or just want to say hi? Feel free to use this form!</p>
                <label for="email"><b>Your email (optional):</b></label>
                <input class="email-input" type="text" name="email" placeholder="your email address here.." onChange={handleChange}/>
                <textarea name="content" placeholder="blah blah blah..." onChange={handleChange}/>
                <input class="submit-button" type="submit"/>
                {formError && <div class="error-message">{formError}</div>}
            </form>
        </div>
    )
}

export default EmailForm;