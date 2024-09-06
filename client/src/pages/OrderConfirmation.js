import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from "../Context/Cart";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  const navigate = useNavigate();
  const [,setCart] = useCart(); 

  // Retrieve the token from local storage or any other secure place
  const auth = JSON.parse(localStorage.getItem('auth')); // Replace with the method you're using to store the token
  const token = auth?.token;

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        let items = localStorage.getItem('cart');
        items = items ? JSON.parse(items) : []; // Ensure items is parsed into an array
        
        if (sessionId) {
          // Optionally, you can send the session_id to your backend for further processing
          const response = await fetch(`${process.env.REACT_APP_API}/api/orders/create-order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': auth.token,
            },
            body: JSON.stringify({ sessionId, items }), // Convert body to JSON string
          });

          const result = await response.json();
          if (result.success) {
            localStorage.removeItem("cart");
            // 
            const userId = auth.user._id;
            localStorage.removeItem(`cart_${userId}`);
       
            setCart([]); 
            console.log('Order created successfully');
          } else {
            console.error('Order creation failed:', result.message);
          }
        } else {
          console.error('No session_id found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    confirmPayment();
  }, [sessionId, setCart, token]); // Added token to the dependency array

  return (
    <div className="container">
      <h1 className="text-center">Order Confirmation</h1>
      <p className="text-center">Thank you for your purchase!</p>
      <p className="text-center">Your order has been processed successfully.</p>
      <div className="text-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
