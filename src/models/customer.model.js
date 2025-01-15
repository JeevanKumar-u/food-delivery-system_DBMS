import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Customer extends Model {}

Customer.init({
    CustomerID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    Phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    LoyaltyPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Role: {
        type: DataTypes.ENUM('admin', 'customer'),
        defaultValue: 'customer',
    },
    
}, {
    sequelize,
    modelName: 'Customer',
    tableName: 'Customer',  // Explicitly specify the table name
    timestamps: false, // If your table does not have createdAt/updatedAt columns
});

export default Customer;
