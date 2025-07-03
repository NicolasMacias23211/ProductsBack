import express from 'express';
import productRoutes from './routes/productRoutes.ts';
import categoryRoutes from './routes/categoryRoutes.ts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

export default app;
