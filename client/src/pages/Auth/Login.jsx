import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../Context/Auth";
import { AiFillGoogleCircle } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

    if (!password) {
      toast.error("Password is required");
      valid = false;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
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
      const res = await axios.post(`${process.env.REACT_APP_API}/api/login`, { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message, { duration: 2000 });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
        }, 2000);
      } else {
        toast.error(res.data.message, { duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const loginWithGoogle = () => {
    window.open(`${process.env.REACT_APP_API}/auth/google/callback`, "_self");
  };

  return (
    <Layout title="Login Page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">LOGIN</h1>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
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
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </div>

          <div className="mt-2">
            <button
              type="button"
              className="login-with-google-btn btn btn-primary"
              onClick={loginWithGoogle}
            >
              <AiFillGoogleCircle style={{ marginRight: "8px" }} />
              Sign In with Google
            </button>
          </div>

          <div className="register-forgot">
            <NavLink to="/register" className="nav-link font-weight-bold">
              New user? Sign up
            </NavLink>
            <NavLink to="/forgot-password" className="nav-link">
              Forgot Password?
            </NavLink>
            <NavLink to="/reset-password" className="nav-link">
              Forgot Password using OTP?
            </NavLink>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
