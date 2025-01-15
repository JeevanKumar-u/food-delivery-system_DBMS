// src/routes/restaurantRoutes.js
import { Router } from 'express';
import Restaurant from '../models/Restaurant.model.js';

const router = Router();

router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      attributes: ['RestaurantID', 'Name', 'Address', 'Phone', 'CulinaryType'],
    });
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Server error while fetching restaurants" });
  }
});


export default router;
