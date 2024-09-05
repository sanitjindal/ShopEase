import express from "express";
import {registerController,loginController,testController,userAuthController,forgotPasswordController,adminAuthController, updateProfileController, generateOTP, verifyOTPAndResetPassword} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddlware.js";
const router = express.Router();

// routes

// Register - Method POST
router.post("/register",registerController);

//Login - POST
router.post("/login", loginController);

// Forgot password
router.post("/forgot-password", forgotPasswordController);

// test routes
router.get("/test", requireSignIn , isAdmin,testController);

// protected User Route Auth

router.get("/user-auth",requireSignIn, userAuthController);

// protected Admin Route Auth
router.get("/admin-auth",requireSignIn, isAdmin, adminAuthController);

// profile route
router.put("/profile", requireSignIn, updateProfileController);


// Google route
// router.post("/google",googleController)

// router for OTPS

router.post('/generate-otp', generateOTP);

router.post('/verify-otp', verifyOTPAndResetPassword);


export default router;