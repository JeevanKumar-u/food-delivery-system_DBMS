import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrderItem = sequelize.define('OrderItem', {
  OrderID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Orders',
      key: 'OrderID',
    },
    allowNull: false,
    primaryKey: true,
  },
  ItemID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'OrderItem',
  timestamps: false,
});



export default OrderItem;
