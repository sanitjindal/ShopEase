import dotenv from "dotenv";
dotenv.config();
import twilio from "twilio";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtil.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../emailService.js";
import axios from 'axios';

export const registerController = async (req, res) => {
  try {
    // Validate reCAPTCHA token
    const recaptchaToken = req.body.recaptchaToken;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Your secret key from Google reCAPTCHA
    

    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`);
    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
    }

    const { name, email, password, phone, address, answer } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Already registered. Please login.",
      });
    }

    // Register the user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();

    // Send registration email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'User Registration Successful',
      text: `Hello ${name},\n\nWelcome to ShopEase!⌚You have successfully registered.🎉🎉\n\n Your Login Credentials are :\n Email-ID : ${email} \n Password : ${password}. \n\n Thanks\nBest Regards\nShopEaseTeam`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
          success: true,
          message: "User registered but failed to send email.",
          user,
        });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({
          success: true,
          message: "User registered successfully and email sent.",
          user,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while registering the user",
      error: error.message,
    });
  }
};
// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    // Verify password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token)

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Forgot Password Controller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({
        message: "Email is Required",
      });
    }
    if (!answer) {
      return res.status(400).send({
        message: "Question is Required",
      });
    }
    if (!newPassword) {
      return res.status(400).send({
        message: "New Password is Required",
      });
    }
    // Check

    const user = await userModel.findOne({ email, answer });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

export const testController = async (req, res) => {
  res.send("protected route");
};

export const userAuthController = (req, res) => {
  res.status(200).send({ ok: true });
};

export const adminAuthController = (req, res) => {
  res.status(200).send({ ok: true });
};

// PRofile

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};


const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const generateOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    // Check if user exists with the given phone number
    const user = await userModel.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpToken = jwt.sign({ otp }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    }); // OTP valid for 10 minutes

    // Send OTP via SMS
    await twilioClient.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    // Respond with success message and OTP token
    res.json({ message: "OTP sent successfully", otpToken });
  } catch (error) {
    // Log the error and send server error response
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
export const verifyOTPAndResetPassword = async (req, res) => {
  const { otpToken, otp, newPassword, phone } = req.body;
  console.log(phone)
  console.log(otpToken)

  try {
    // Step 1: Verify the OTP token
    let decoded;
    try {
      decoded = jwt.verify(otpToken, process.env.JWT_SECRET);
      console.log(decoded)
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired OTP token" });
    }

    // Step 2: Validate the OTP
    if (decoded.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Step 3: Find the user by phone number
    const user = await userModel.findOne({ phone });
    console.log("user",user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 4: Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 5: Update the user's password
    user.password = hashedPassword;

    // Log the user document before saving
    console.log("User before saving:", user);

    await user.save();

    // Log the user document after saving
    console.log("User after saving:", user);

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

