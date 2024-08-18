import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

// routes

router.post("/create-product",requireSignIn,isAdmin, formidable(), createProductController)

// get Products
router.get("/get-product", getProductController);


// Single Product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController)

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// update product

router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );

  // filter-product
  router.post("/product-filters",productFiltersController);

  // Product Count
  router.get("/product-count", productCountController);

  // product per page
  router.get("/product-list/:page",productListController);

  // search product
  router.get("/search/:keyword", searchProductController);

  // Similar Product
  router.get("/related-product/:pid/:cid", relatedProductController)

  // category Wise Product
  router.get("/product-category/:slug", productCategoryController);
export default router