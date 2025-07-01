import "./EmailForm.css";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EmailForm = () => {
    const [inputs, setInputs] = useState("");
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
        setFormError('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = inputs["email"];
        const name = inputs["name"];
        const subject = inputs["subject"];
        const content = inputs["content"];

        if (!content) {
            setFormError("Message must be non-empty");
            setSuccess('');
            return;
        }

        if (!email) {
            setFormError("Email must be non-empty");
            setSuccess('');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setFormError("Please enter a valid email address");
            setSuccess('');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/send-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, subject, content }),
            });

            if (!response || !response.ok) {
                console.error("Backend Error:", text);
                throw new Error("");
            }

            const text = await response.text();
            setSuccess(`Message sent successfully!\nEmail: ${email || "(empty)"}`);
            // console.log(text, email, content);
        } catch (e) {
            setFormError("Unable to send email :(");
            setSuccess('');
        }
    }

    return (
        <div class="email-form-container">
            <p>Do you have any questions or comments, or just want to say hi? Feel free to use this form!</p>
            <form id="emailForm" onSubmit={handleSubmit}>
                <div class="contact-container">
                    <div class="contact-field">
                        <label for="email"><b>Email:</b></label>
                        <input class="field-input" type="text" name="email" placeholder="Your Email...*" onChange={handleChange}/>
                    </div>
                    <div class="contact-field">
                        <label for="name"><b>Name:</b></label>
                        <input class="field-input" type="text" name="name" placeholder="Your Name..." onChange={handleChange}/>
                    </div>
                </div>
                <label for="subject"><b>Subject:</b></label>
                <input class="field-input" type="text" name="subject" placeholder="Your Subject..." onChange={handleChange}/>
                <textarea name="content" placeholder="Your Message...*" onChange={handleChange}/>
                <input class="button-main" type="submit"/>
                {formError && <div class="error-message">Error: {formError}</div>}
                {success && <div class="success-message">{success}</div>}
            </form>
        </div>
    )
}

export default EmailForm;