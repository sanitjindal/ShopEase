import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    payment: {
      sessionId: String,
      paymentMethod: String,
      amount: Number,
      currency: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
    totalAmount: { type: Number, default: 0 }, // Add totalAmount field
    createdAt: { type: Date, default: Date.now },
  },

  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
