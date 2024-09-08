import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    
    const navigate = useNavigate();
    
    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate form fields
    const validateForm = () => {
        let valid = true;

        if (!email) {
            toast.error("Email is required");
            valid = false;
        } else if (!emailPattern.test(email)) {
            toast.error("Invalid email format");
            valid = false;
        }

        if (!newPassword) {
            toast.error("New password is required");
            valid = false;
        } else if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters long");
            valid = false;
        }

        if (!answer) {
            toast.error("Security answer is required");
            valid = false;
        }

        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/forgot-password`, {
                email, 
                newPassword,
                answer
            });
            if (res && res.data.success) {
                toast.success(res.data.message, { duration: 4000 });
                navigate('/login'); 
            } else {
                toast.error(res.data.message, { duration: 4000 });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    return (
        <Layout title={'Forgot Password'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1 className="title">RESET PASSWORD</h1>
                    
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder="Enter Your Favorite Sports"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Enter New Password"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                        RESET
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
