import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// routes
// Create Category
router.post("/create-category",requireSignIn, isAdmin, createCategoryController );

// Update Category

router.put("/update-category/:id",requireSignIn,isAdmin, updateCategoryController);

// Get All Category

router.get("/get-category",categoryController);

// Get Single Category

router.get("/single-category/:slug",singleCategoryController);

// Delete category

router.delete("/delete-category/:id",requireSignIn,isAdmin,deleteCategoryController)


export default router;
