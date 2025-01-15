import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Customer', // Make sure this is correct for your Customer table
      key: 'CustomerID',   // Ensure 'CustomerID' is the primary key in the 'Customers' table
    },
  },
});

// Define associations
Cart.associate = (models) => {
  Cart.belongsTo(models.Customer, { foreignKey: 'userId' });
  Cart.hasMany(models.CartItem, { foreignKey: 'cartId' });
};

export default Cart;
