import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../Context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Form Function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message, { duration: 2000 });
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

  return (
    <Layout title="Registration Page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="title">LOGIN</h1>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
           <div className="register-forgot">
            <NavLink to="/register" className="nav-link font-weight-bold">
              Signup
            </NavLink>
            <NavLink to="/forgot-password" className="nav-link">
              Forgot-Password?
            </NavLink>
           
          </div>
          </div>

            {/* <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
            </div> */}
        </form>
      </div>
    </Layout>
  );
};

export default Login;
