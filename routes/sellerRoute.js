import express from 'express'
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerController.js';
import { authSeller } from '../middlewares/authSeller.js';

const SellerRouter = express.Router();

SellerRouter.post('/login', sellerLogin)
SellerRouter.get('/is-auth',authSeller, isSellerAuth)
SellerRouter.get('/logout', sellerLogout)


export default SellerRouter