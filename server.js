import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors";

// configure Dotenv
dotenv.config();

//db connection
connectDB();

const app = express();

// MiddleWare

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api",authRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/product",productRoutes);

app.get("/",(req,res)=>{
    
    res.send(" Welcome to e-commerce app");
})

app.listen(process.env.PORT, () => {
    console.log(`Server Running on ${process.env.PORT}`);
});