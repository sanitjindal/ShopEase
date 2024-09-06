import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { AiFillGoogleCircle } from "react-icons/ai";
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null); // Added for reCAPTCHA

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= minLength && specialCharPattern.test(password);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^\+91[0-9]{10}$/;
    return phonePattern.test(phone);
  };

  const validateForm = () => {
    if (!name) {
      toast.error("Name is required");
      return false;
    }
    if (!email || !validateEmail(email)) {
      toast.error("Valid email is required");
      return false;
    }
    if (!password || !validatePassword(password)) {
      toast.error("Password must be at least 8 characters long and include at least one special symbol");
      return false;
    }
    if (!phone || !validatePhone(phone)) {
      toast.error("Valid phone number is required (10 digits)");
      return false;
    }
    if (!address) {
      toast.error("Address is required");
      return false;
    }
    if (!answer) {
      toast.error("Security answer is required");
      return false;
    }
    if (!captchaValue) { // Check for reCAPTCHA
      toast.error("Please complete the CAPTCHA");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
        recaptchaToken: captchaValue, // Added for reCAPTCHA
      });
      if (res && res.data.success) {
        toast.success(res.data.message, { duration: 4000 });
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        toast.error(res.data.message, { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const loginWithGoogle = () => {
    window.open(`${process.env.REACT_APP_API}/auth/google/callback`, "_self");
  };

  return (
    <Layout title="Registration Page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Signup For Account</h1>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              required
              minLength="3"
            />
          </div>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputSports"
              placeholder="What is your Favorite Sports"
              required
            />
          </div>

          <ReCAPTCHA
            sitekey="6Lf4ODAqAAAAAJYFKje3zcbp-YDxopI5JKpMbMvE"  // Replace with your actual Site Key
            onChange={(value) => setCaptchaValue(value)} // Capture the reCAPTCHA value
          />

          <button type="submit" className="btn btn-primary btn-block mt-3">
            Signup
          </button>
          <div className="mt-2">
            <button
              type="button"
              className="login-with-google-btn btn btn-primary"
              onClick={loginWithGoogle}
            >
              <AiFillGoogleCircle style={{ marginRight: "8px" }} />
              Sign Up with Google
            </button>
          </div>
          <NavLink to="/login" className="nav-link mt-2">
            Have an account? Sign in
          </NavLink>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
