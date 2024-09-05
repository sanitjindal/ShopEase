import React, { useState } from 'react';
import GenerateOTPComponent from './GenerateOTPComponent';
import VerifyOTPComponent from './VerifyOTPComponent';

const OTPResetPassword = () => {
    const [otpToken, setOtpToken] = useState('');

    return (
        <div>
            {!otpToken ? (
                <GenerateOTPComponent setOtpToken={setOtpToken} />
            ) : (
                <VerifyOTPComponent otpToken={otpToken} />
            )}
        </div>
    );
};

export default OTPResetPassword;
