import express from "express";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config(); 
const router = express.Router();
const stripe = Stripe(
  process.env.STRIPE_SECRET_KEY
);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100, // Convert price to cents (Stripe uses the smallest currency unit)
      },
      quantity: 1,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`, // URL to redirect to after successful payment
      cancel_url: `${req.headers.origin}/cart`, // URL to redirect to if payment is canceled
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
