import express from "express";
const router =express.Router();
import { requireSignIn ,isAdmin} from "../middlewares/authMiddlware.js";
import { createOrder, getOrders, getAllOrders } from "../controllers/orderController.js";


router.post('/create-order',requireSignIn,createOrder)
router.get('/getOrders',requireSignIn,getOrders)
router.get("/admin/getorders", requireSignIn, isAdmin, getAllOrders);

export default router;
