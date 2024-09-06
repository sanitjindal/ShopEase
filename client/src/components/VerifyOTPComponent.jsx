import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VerifyOTPComponent = ({ otpToken }) => {
    const [otp, setOtp] = useState('');
    const [phone, setPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedPhoneNumber = localStorage.getItem('phoneNumber');
        if (storedPhoneNumber) {
            setPhone(`+91${storedPhoneNumber}`);
        }
    }, []);

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post('/api/verify-otp', { otpToken, otp, newPassword, phone });

            console.log('Response:', response.data);

            if (response) {
                // alert('Password reset successfully.')
                toast.success('Password reset successfully.');

                
                // Attempt to navigate immediately without delay
                navigate('/login');
            } else {
                toast.error('Failed to reset password. Please check your OTP and try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

  

    return (
        <div style={styles.fullScreenContainer}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Verify OTP & Reset Password</h2>
                <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phone}
                    style={styles.input}
                    readOnly
                />
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={styles.input}
                />
                <button
                    onClick={handleVerifyOTP}
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Reset Password
                </button>
                {/* Button to test navigation */}
                
            </div>
        </div>
    );
};

const styles = {
    fullScreenContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #b7f8db, #50a7c2)',
        padding: '20px',
    },
    container: {
        padding: '30px',
        maxWidth: '400px',
        width: '100%',
        margin: '0 auto',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        color: '#fff',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: '"Poppins", sans-serif',
    },
    input: {
        padding: '12px',
        margin: '10px 0',
        width: '100%',
        borderRadius: '8px',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        color: '#333',
        backgroundColor: '#f7f7f7',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
        padding: '12px',
        width: '100%',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: '#ff7e5f',
        color: '#fff',
        transition: 'background 0.3s ease',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    },
    buttonHover: {
        backgroundColor: '#ff6f61',
    },
    testButton: {
        marginTop: '10px',
        padding: '12px',
        width: '100%',
        borderRadius: '8px',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: '#00aaff',
        color: '#fff',
        transition: 'background 0.3s ease',
    }
};

export default VerifyOTPComponent;
