// src/models/CartItem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CartItem = sequelize.define('CartItem', {
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Carts', // Link to the Cart table
      key: 'id',
    },
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  restaurantName: {
    type: DataTypes.STRING,
  },
  availability: {
    type: DataTypes.BOOLEAN,
  },
});

// Define the reverse association for CartItem -> Cart
CartItem.associate = (models) => {
  CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });
};

export default CartItem;
