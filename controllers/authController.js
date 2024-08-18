import userModel from "../models/userModel.js";
import {comparePassword, hashPassword} from "../utils/authUtil.js";
import jwt from "jsonwebtoken";


export const registerController = async(req,res)=>{
        try {
            const {name, email, password, phone, address,answer}= req.body;

            //validations

            if(!name){
                return res.send({ message : "Name is Required"});
            }
            if(!email){
                return res.send({ message : "Email is Required"});
            }
            if(!password){
                return res.send({ message : "Password is Required"});
            }
            if(!phone){
                return res.send({ message : "Phone is Required"});
            }
            if(!address){
                return res.send({ message : "Address is Required"});
            }
            if(!answer){
                return res.send({ message : "Answer is Required"});
            }

            //check user
            const existingUser = await userModel.findOne({ email });

            // existing user
            if(existingUser){
                return res.status(200).send({ 
                     success: false,
                     message : "Already registered Please Login" });
            }

            // register user
            const hashedPassword= await hashPassword(password);

            // save
            const user= await new userModel({name,email,password:hashedPassword,phone,address,answer}).save();
            return res.status(200).send({
                success: true,
                message : "User Registered Successfully",
                user
            });


        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                message:"Error while registering a user",
                error:error.message
            })
            
        }
};

// POST LOGIN

export const loginController = async(req,res)=>{
    try {
        const {email,password}=req.body;
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Email and Password are invalid"
            })
        }

        // check user

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
                });
            }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(404).send({
                success:false,
                message:"Password is incorrect"
                })
        }

        //token

        const token = await jwt.sign({_id: user._id},process.env.JWT_SECRET,{
            expiresIn: "7d"
        })
        console.log(token)
        res.status(200).send({
            success:true,
            message:"User logged in successfully",
            user:{
                _id: user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token:token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while logging in a user",
            error:error.message
            })
    }

}


// Forgot Password Controller

export const forgotPasswordController= async(req,res)=>{
    try {
        const { email, answer , newPassword } = req.body;
        if(!email){
            return res.status(400).send({
                message:"Email is Required"
        })
        }
        if(!answer){
            return res.status(400).send({
                message:"Question is Required"
        })
        }
        if(!newPassword){
            return res.status(400).send({
                message:"New Password is Required"
        })
        }
        // Check 

        const user = await userModel.findOne({email,answer})

        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password Reset successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Something went Wrong"
        })
    }


}

export const testController = async(req,res)=>{
        res.send("protected route")
}

export const userAuthController = (req,res)=>{
    res.status(200).send({ ok : true })
}

export const adminAuthController = (req,res)=>{
    res.status(200).send({ ok : true })
}

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
        message: "Error WHile Update profile",
        error,
      });
    }
  };
