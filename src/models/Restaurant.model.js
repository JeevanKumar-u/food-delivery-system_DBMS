// Restaurant.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Restaurant = sequelize.define('Restaurant', {
  RestaurantID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, allowNull: false },
  Address: { type: DataTypes.STRING },
  Phone: { type: DataTypes.STRING },
  CulinaryType: { type: DataTypes.STRING }
}, { tableName: 'Restaurant', timestamps: false });


export default Restaurant;
