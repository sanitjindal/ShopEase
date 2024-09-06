import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const auth = JSON.parse(localStorage.getItem("auth")); // Replace with the method you're using to store the token

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/orders/getOrders`, {
        headers: {
          Authorization: auth.token,
        },
      });

      console.log(data);
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">Products</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order._id}</td>
                      <td>Rs. {order.totalAmount}</td>
                      <td>
                        {order.products.map((product, i) => (
                          <div key={i}>
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                            <p>Price: Rs.{product.price}</p>
                          </div>
                        ))}
                      </td>
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

export default Orders;
