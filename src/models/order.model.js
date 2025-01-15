import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import OrderItem from './orderItem.model.js';

const Order = sequelize.define('Order', {
  OrderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  CustomerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  RestaurantID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Orders',
  timestamps: false,
});



export default Order;
