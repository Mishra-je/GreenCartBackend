import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import SellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/ordreRoute.js';
const port = process.env.PORT ||  5000;

await connectDB();
await connectCloudinary();

// Allow multiple origins 
const allowedOrigins = ['http://localhost:5173'];

 
// Middleware Configuration 
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : allowedOrigins ,credentials:true}))
app.use(express.urlencoded({ extended: true }));



app.get('/',(req,res) => {
    res.send('API is working fine !')
})

app.use('/api/user',userRouter)
app.use('/api/seller',SellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)


app.listen(port,() => {
    console.log(`Server is running on http://localhost: ${port}`)
})

