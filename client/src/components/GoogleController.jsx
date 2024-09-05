import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GoogleController = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleAuth = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const userStr = urlParams.get('user');

            if (token && userStr) {
                try {
                    // Parse the user object
                    const user = JSON.parse(decodeURIComponent(userStr));

                    // Combine token and user into one object
                    const authData = { token, user };

                    // Store the combined object in localStorage under 'auth' key
                    localStorage.setItem('auth', JSON.stringify(authData));

                    toast.success('Logged in successfully!');
                    navigate('/'); // Redirect to the desired page after login
                } catch (error) {
                    toast.error('Failed to login with Google. Please try again.');
                    navigate('/login');
                }
            } else {
                toast.error('No token found. Please try again.');
                navigate('/login');
            }
        };
        handleGoogleAuth();
    }, [navigate]);

    return (
        <div>
            <h2>Logging in with Google...</h2>
        </div>
    );
};

export default GoogleController;
