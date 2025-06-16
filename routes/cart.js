import express from "express";
import { addToCart, clearCart, decreaseProductQuantity, removeProductFromCart, userCart } from "../controllers/cart.js";
import { isAuthenticated } from "../middlewares/auth.js";



const router = express.Router();

//add item to cart
// @api - /api/cart/add
// @method - POST
router.post("/add",isAuthenticated,addToCart);

// get user cart
// @api - /api/cart/user
// @method - GET
router.get("/user", isAuthenticated, userCart);

// remove product from cart
// @api - /api/cart/remove/:productId
// @method - DELETE
router.delete('/remove/:productId',isAuthenticated,removeProductFromCart);

// clear cart
// @api - /api/cart/clear
// @method - DELETE
router.delete('/clear', isAuthenticated,clearCart);

// decrease quantity of product in cart
// @api - /api/cart/decrease
// @method - POST
router.post('/decrease', isAuthenticated, decreaseProductQuantity);


export default router;