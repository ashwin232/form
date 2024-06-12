import React, { useState } from 'react';
import axios from 'axios';
import './form.css'

const Form = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!email) {
            setError('Email is required.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format.');
            return;
        }

        try {
            const response = await axios.post('http://34.225.132.160:8002/api', { email });

            if (response.status === 200) {
                setMessage('Form Submitted');
            }
        } catch (err) {
            if (err.response && err.response.status === 422 && email.endsWith('@ez.works')) {
                setError('Email ending with @ez.works is not allowed.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="form-container">
            <div className="left-column">
                <h1>Ez Works</h1>
                <p className="description">Suite of business support services</p>
                <p className="lorem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder='enter mail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p className="error">{error}</p>}
                    {message && <p className="message">{message}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="right-column">
                <div className="services">
                    <div className="service-box">Presentation Design
                    <p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p></div>
                    <div className="service-box">Graphic and Video
                    <p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p></div>
                    <div className="service-box">Translation Services
                    <p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p></div>
                    <div className="service-box">Graphic Design<p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p></div>
                    <div className="service-box">Data processing<p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p></div>
                    <div className="service-box">Social Media Management<p>Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet</p></div>
                </div>
            </div>
        </div>
    );
};

export default Form;