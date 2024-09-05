import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group" style={{ padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h4
          style={{
            background: "linear-gradient(135deg, #333, #000)",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          Admin Panel
        </h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            transition: "background 0.3s, color 0.3s",
          }}
          activeStyle={{
            background: "#007bff",
            color: "#fff",
          }}
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            transition: "background 0.3s, color 0.3s",
          }}
          activeStyle={{
            background: "#007bff",
            color: "#fff",
          }}
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            transition: "background 0.3s, color 0.3s",
          }}
          activeStyle={{
            background: "#007bff",
            color: "#fff",
          }}
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
          style={{
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            transition: "background 0.3s, color 0.3s",
          }}
          activeStyle={{
            background: "#007bff",
            color: "#fff",
          }}
        >
          View All Orders
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
