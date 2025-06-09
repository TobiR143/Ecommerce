import express from 'express'
import { CartController } from '../controllers/CartController.js'
export const cartRoutes = express.Router()

cartRoutes.get('/:userId', CartController.getCartByUserId)
cartRoutes.post('/:userId', CartController.addToCart)
cartRoutes.patch('/:userId', CartController.updateCartItemQuantity)
cartRoutes.delete('/:userId', CartController.removeFromCart)
cartRoutes.delete('/:userId/all', CartController.clearCart)
