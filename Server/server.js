import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import userModel from "./models/userModel.js";
import paymentRoutes from './routes/paymentRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import googleRoute from "./routes/googleRoute.js"

// configure Dotenv

//db connection
connectDB();

const app = express();

// Google OAuth
const clientid = process.env.CLIENT_ID
const clientsecret = process.env.CLIENT_SECRET

// MiddleWare

app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend origin
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(morgan('dev'));

app.use("/api",authRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/product",productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders',orderRoutes)
app.use('/', googleRoute);



// Setup Session

app.use(session({
    secret :"15672983hakdhfjkjdsd",
    resave :false,
    saveUninitialized :true,
})) // Generate a unique session ID whenever User Logins With google

// Set up Passport
app.use(passport.initialize())

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "http://localhost:8080/auth/google/callback",
        scope: ["profile","email"]
    },
    async(accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
            let user = await userModel.findOne({googleId:profile.id})
            if(!user) {
                const fullName = `${profile.name.givenName} ${profile.name.familyName}`;
                user = await userModel.create({
                    googleId: profile.id,
                    name: fullName,
                    email: profile.emails[0].value,
                    })
                    await user.save();
                }
                return done(null,user);
        } catch (error) {
            return done(error,null);
        }
    }
    )
)


// // Initialize Google Auth Login
// app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// app.get("/auth/google/callback",passport.authenticate("google",{
//     // successRedirect: "http://localhost:3000/",
//     failureRedirect: "http://localhost:3000/login",
//     session : false
// }),(req,res)=>{
//     const token = req.user.generateJWT();
//     const user = req.user;
  
//     const userStr = encodeURIComponent(JSON.stringify(user))

//     res.redirect(`http://localhost:3000/google/callback?token=${token}&user=${userStr}`)
// })

// app.get("/login/success",async(req,res)=>{
    
//     if(req.user){
//         res.status(200).json({message:"user login",user:req.user})
//     }
//     else{
//         res.status(400).json({message:"not authorized"})
//     }
// })

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});