// routes/menu.js or your main app file (e.g., app.js)
import express from 'express';
import { MenuItem, Restaurant } from '../models/index.js';

const router = express.Router();

router.get('/menu-items', async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      include: [{ model: Restaurant, attributes: ['Name'] }],
      order: [['RestaurantID', 'ASC']],
    });

    // Log the raw data fetched
    // console.log("Raw menu items data:", JSON.stringify(menuItems, null, 2));

    const menuItemsWithRestaurantNames = menuItems.map(item => ({
      ItemID: item.ItemID,
      Name: item.Name,
      Description: item.Description,
      Price: item.Price,
      Category: item.Category,
      Availability: item.Availability,
      RestaurantName: item.Restaurant ? item.Restaurant.Name : 'Unknown',
    }));

    // Log transformed data
    // console.log("Transformed data:", menuItemsWithRestaurantNames);

    res.json(menuItemsWithRestaurantNames);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Server error while fetching menu items" });
  }
});


export default router;
