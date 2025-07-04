import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.ts';
import categoryRoutes from './routes/categoryRoutes.ts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

export default app;
