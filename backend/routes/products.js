import express from "express";
import {
  createProductReview,
  deleteProduct,
  deleteReview,
  getProductDetails,
  getProductReview,
  getProducts,
  newProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/product/:id").get(getProductDetails);
router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/product/reviews")
  .put(isAuthenticatedUser, createProductReview)
  .get(isAuthenticatedUser, getProductReview);

router
  .route("/admin/product/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);
export default router;
