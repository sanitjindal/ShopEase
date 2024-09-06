import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../Hooks/useCategory";
import { useCart } from "../../Context/Cart";
import { Badge } from "antd";
import ConfirmLogoutDialog from "./ConfirmLogoutDialog";
import axios from "axios";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/login/success`, { withCredentials: true });
      setUserData(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(); // Call getUser to fetch user data on component mount
    if (auth?.user) {
      const savedCart = localStorage.getItem(`cart_${auth.user._id}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [auth, setCart]);

  useEffect(() => {
    if (auth?.user) {
      localStorage.setItem(`cart_${auth.user._id}`, JSON.stringify(cart));
    }
  }, [cart, auth]);

  const handleLogout = () => {
    if (auth?.user) {
      localStorage.setItem(`cart_${auth.user._id}`, JSON.stringify(cart));
    }

    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    setCart([]);
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setShowConfirm(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "grey" }}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand fancy-brand">
              🛍️ ShopEase
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={() => setShowConfirm(true)}
                          to="#"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showConfirm && (
        <ConfirmLogoutDialog
          onConfirm={handleLogout}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default Header;
