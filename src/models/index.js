
import Restaurant from './Restaurant.model.js';
import Customer from './customer.model.js';
import Cart from './cart.model.js';
import CartItem from './cartitem.model.js';
import MenuItem from './MenuItem.model.js';
import Order from './order.model.js';
import OrderItem from './orderItem.model.js';

// Define associations
Restaurant.hasMany(MenuItem, { foreignKey: 'RestaurantID' });
MenuItem.belongsTo(Restaurant, { foreignKey: 'RestaurantID' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

CartItem.belongsTo(MenuItem, { foreignKey: 'itemId' });
MenuItem.hasMany(CartItem, { foreignKey: 'itemId' });

// Customer and Cart associations
Customer.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(Customer, { foreignKey: 'userId' });

// Load models into an object
const models = { Cart, CartItem, MenuItem, Restaurant, Customer };

// Set up associations after models are loaded
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

OrderItem.belongsTo(Order, {
  foreignKey: 'OrderID',
  targetKey: 'OrderID',
  as: 'order', // Optional alias for the relationship
});

Order.hasMany(OrderItem, {
  foreignKey: 'OrderID',
  sourceKey: 'OrderID',
  as: 'orderItems',
});

export { Cart, CartItem, MenuItem, Restaurant, Customer ,Order,OrderItem };
