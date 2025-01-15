import { Router } from 'express';
import Customer from '../models/customer.model.js';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ where: { Email: email } });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Save the new customer to the database
        const newCustomer = await Customer.create({
            Name: name,
            Email: email,
            Phone: phone,
            Address: address,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Customer created successfully!', customer: newCustomer });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Error creating customer', error: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password, isAdmin } = req.body;

        // Find the customer in the database
        const customer = await Customer.findOne({ where: { Email: email } });
        if (!customer) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the user is trying to log in as an admin
        if (isAdmin && customer.Role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin credentials required.' });
        }

        // Compare the password with the hashed password
        const match = await compare(password, customer.password);
        if (match) {
            // Generate JWT token
            const token = jwt.sign(
                {
                    customerId: customer.CustomerID,
                    email: customer.Email,
                    role: customer.Role,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login successful!',
                token,
                customer: {
                    id: customer.CustomerID,
                    name: customer.Name,
                    email: customer.Email,
                    role: customer.Role,
                },
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret
        req.customerId = decoded.customerId; // Attach customerId from decoded token
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// Fetch customer details by token
router.get('/me', verifyToken, async (req, res) => {
    try {
        // Find the customer based on the ID decoded from the JWT token
        const customer = await Customer.findOne({ where: { CustomerID: req.customerId } });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Return customer details (excluding sensitive information like password)
        res.json({
            id: customer.CustomerID,
            name: customer.Name,
            email: customer.Email,
            phone: customer.Phone,
            address: customer.Address,
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
