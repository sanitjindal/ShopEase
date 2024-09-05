import express from "express";
// Import your JWT verification middleware
import Order from "../models/orderModel.js"; // Import your Order model
import User from "../models/userModel.js"
const router = express.Router();

//
export const createOrder = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Authenticated User:", req.user);

    const { sessionId, items } = req.body;

    if (!sessionId) {
      return res
        .status(400)
        .json({ success: false, message: "Session ID is required" });
    }

    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const totalAmount = items.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity),
      0
    );
    

    const newOrder = new Order({
      sessionId,
      userId: req.user._id,
      products: items,
      totalAmount,
    });

    await newOrder.save();
    res
      .status(200)
      .json({ success: true, message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    // Populate the 'products' field with product details
    const orders = await Order.find({ userId })
      .populate({
        path: 'products', // Field in Order model referencing Product
        select: 'name price description photo', // Select the fields you need from the Product model
      });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, message: "Orders found", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

};



export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: 'products', 
        select: 'name price description photo', 
      })
      .populate({
        path: 'userId', 
        model: User,
        select: 'name email', 
      });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, message: "Orders retrieved successfully", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default router;

