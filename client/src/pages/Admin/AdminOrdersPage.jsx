import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth")); // Get auth token from local storage

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/admin/getorders", {
        headers: {
          Authorization: auth.token,
        },
      });

      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Layout title={"Admin - All Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order._id}</td>
                      <td>Rs. {order.totalAmount}</td>
                      <td>{new Date(order.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrdersPage;
