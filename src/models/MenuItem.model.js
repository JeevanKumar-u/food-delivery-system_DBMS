// models/MenuItem.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Restaurant from './Restaurant.model.js';

const MenuItem = sequelize.define('MenuItem', {
  ItemID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: DataTypes.TEXT,
  Price: DataTypes.FLOAT,
  Category: DataTypes.STRING,
  Availability: DataTypes.BOOLEAN,
  RestaurantID: {
    type: DataTypes.INTEGER,
    references: {
      model: Restaurant,
      key: 'RestaurantID',
    },
  },
}, { tableName: 'MenuItem', timestamps: false });

export default MenuItem;
