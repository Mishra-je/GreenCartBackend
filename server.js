import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/ordreRoute.js';

const app = express();
const port = process.env.PORT || 5000;

// Connect to DB and Cloudinary
await connectDB();
await connectCloudinary();

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
//   'https://gree-cart-frontend.vercel.app/'
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));


app.get('/', (req, res) => {
  res.send('API is working fine!');
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
