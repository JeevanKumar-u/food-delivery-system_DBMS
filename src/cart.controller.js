// src/controllers/cart.controller.js
import Cart from './models/cart.model.js';
import CartItem from './models/cartitem.model.js';
import MenuItem from './models/MenuItem.model.js';
import Order from './models/order.model.js';
import OrderItem from './models/orderItem.model.js';
import Customer from './models/customer.model.js';
import sequelize from './config/database.js';




export const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.params.userId },
      include: {
        model: CartItem,  // Include CartItems related to this cart
        include: ['MenuItem'],  // Assuming MenuItem is a related model
      },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json({
      cartId: cart.id,  // Return cartId to identify the cart
      items: cart.CartItems,  // Send the cart items in a structured way
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Failed to load cart items' });
  }
};



export const addToCart = async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    await sequelize.query('CALL add_to_cart(:userId, :itemId, :quantity)', {
      replacements: { userId, itemId, quantity },
    });
    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
};


// Remove Entire Cart for a User
export const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete all cart items for the user
    const result = await Cart.destroy({
      where: { userId },
    });

    if (result === 0) {
      return res.status(404).json({ success: false, message: 'Cart not found for this user' });
    }

    res.status(200).json({ success: true, message: 'Cart removed successfully' });
  } catch (error) {
    console.error('Error removing cart:', error);
    res.status(500).json({ success: false, message: 'Failed to remove cart' });
  }
};


// Service to place an order
export const placeOrder = async (userId, cartItems) => {
  try {
    // Step 1: Fetch the customer's address from the Customer table
    const customer = await Customer.findOne({ where: { CustomerID: userId } });
    if (!customer) {
      return { success: false, message: 'Customer not found' };
    }

    const address = customer.Address;  // Get the customer's address

    // Step 2: Create the order and calculate the total amount
    const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    // Step 3: Create a new order
    const order = await Order.create({
      Date: currentDate,
      Status: 'Pending',
      Amount: totalAmount,
      CustomerID: userId,
      RestaurantID: 3,  // Use the RestaurantID of the first item (assuming all items are from the same restaurant)
      Address: address,                      // Use the customer's address
    });

    // Step 4: Insert each cart item into the OrderItem table
    const orderItems = cartItems.map(item => ({
      OrderID: order.OrderID,
      ItemID: item.itemId,
      Quantity: item.quantity,
    }));

    // Step 5: Create the order items in the OrderItem table
    await OrderItem.bulkCreate(orderItems);

    return { success: true, order };
  } catch (error) {
    console.error('Error placing order:', error);
    return { success: false, message: 'Error placing order' };
  }
}; 