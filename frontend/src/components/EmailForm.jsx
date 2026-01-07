import "./EmailForm.css";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EmailForm = () => {
    const [inputs, setInputs] = useState("");
    const [formError, setFormError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({...values, [name]: value}));
        setFormError('');

        console.log(name);

        if (name === "email") {
            if (!value) {
                setFormError("Email must be non-empty");
                setSuccess('');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setFormError("Please enter a valid email address");
                setSuccess('');
                return;
            }
        }

        if (name === "content" && !value) {
            setFormError("Message must be non-empty");
            setSuccess('');
            return;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = inputs["email"];
        const name = inputs["name"];
        const subject = inputs["subject"];
        const content = inputs["content"];

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
            setSuccess(`Message has been sent. Thank you!\nYour email: ${email}`);
            // console.log(text, email, content);
        } catch (e) {
            setFormError("Unable to send, please try again later!");
            console.log(e);
            setSuccess('');
        }
    }

    return (
        <div class="email-form-container">
            <p>Any questions, comments, or just want to say hi?</p>
            <form id="emailForm" onSubmit={handleSubmit}>
                {formError && <div class="error-message">!!! {formError}</div>}
                <div class="contact-container">
                    <div class="form-field">
                        <label for="email"><b>Email:</b></label>
                        <input class="field-input" type="text" name="email" placeholder="Your Email...*" onChange={handleChange} required/>
                    </div>
                    <div class="form-field">
                        <label for="name"><b>Name:</b></label>
                        <input class="field-input" type="text" name="name" placeholder="Your Name..." onChange={handleChange}/>
                    </div>
                </div>
                <div class="form-field">
                    <label for="subject"><b>Subject:</b></label>
                    <input class="field-input" type="text" name="subject" placeholder="Your Subject..." onChange={handleChange}/>
                </div>
                <textarea name="content" placeholder="Your Message...*" onChange={handleChange} required/>
                <input class="button-main" type="submit"/>
                {success && <div class="success-message">{success}</div>}
            </form>
        </div>
    )
}

export default EmailForm;