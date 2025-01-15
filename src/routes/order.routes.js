import express from 'express';
import { placeOrder } from '../cart.controller.js';
import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';

const router = express.Router();

// Place Order Route
router.post('/place', async (req, res) => {
  const { userId, cartItems, restaurantId, address } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: 'No items in cart' });
  }

  const result = await placeOrder(userId, cartItems, restaurantId, address);

  if (result.success) {
    return res.json({ success: true, message: 'Order placed successfully!', order: result.order });
  } else {
    return res.status(500).json({ success: false, message: result.message });
  }
});


router.get('/show', async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderItem,
            as: 'orderItems', // Use the alias you defined
            attributes: ['ItemID', 'Quantity'], // Include only relevant fields
          }
        ]
      });
  
      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error fetching orders with items',
      });
    }
  });

export default router;
