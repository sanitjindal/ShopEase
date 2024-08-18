import jwt, { decode } from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protect the user - Protected Route Token Based


export const requireSignIn = (req,res,next)=>{
    try {
        const decode= jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        console.log(error)
    }
};

// admin access

export const isAdmin = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !==1 ){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access",

            })
            }
            
            next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:"Error in admin Middleware",
            error:error.message

        })
    }
    
}