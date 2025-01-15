import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';
import userRoutes from './routes/customer.routes.js';
import orderRoutes from './routes/order.routes.js';
import menuRoutes from './routes/menu.routes.js';
import restaurantRoutes from './routes/restaurant.routes.js';
import cartRoutes from './routes/cart.routes.js';
import adminRoutes from './routes/admin.routes.js'


config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/Users', userRoutes); 
app.use('/api/Orders', orderRoutes); 
app.use('/api',menuRoutes);
app.use('/api',restaurantRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);

sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error: ', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
