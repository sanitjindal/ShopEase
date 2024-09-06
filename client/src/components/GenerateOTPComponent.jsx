import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthStyles.css';

const GenerateOTPComponent = ({ setOtpToken }) => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleGenerateOTP = async () => {
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/generate-otp`, { phone: `+91${phone}` });
      toast.success('OTP sent successfully!');
      
      // Store the phone number in localStorage
      localStorage.setItem('phoneNumber', phone);
      
      setOtpToken(data.otpToken);
      navigate('/reset-password'); // Navigate to the Verify OTP screen
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-container">
        <h2 className="otp-title">Generate OTP</h2>
        <div className="otp-input-group">
          <span className="country-code">+91</span>
          <input
            type="text"
            placeholder="Enter 10-digit phone number"
            value={phone}
            onChange={handlePhoneChange}
            className="otp-input"
          />
        </div>
        <button onClick={handleGenerateOTP} className="otp-button">
          Generate OTP
        </button>
      </div>
    </div>
  );
};

export default GenerateOTPComponent;
