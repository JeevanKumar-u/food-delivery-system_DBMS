// src/routes/cart.routes.js
import express from 'express';
import { addToCart, removeFromCart, getCartItems } from '../cart.controller.js';

const router = express.Router();

// Get Cart Items for a User
router.get('/:userId', getCartItems);  // Use controller function

// Add Item to Cart
router.post('/add', addToCart);  // Use controller function

// Remove Item from Cart
router.delete('/:userId', removeFromCart);  // Use controller function

export default router;
