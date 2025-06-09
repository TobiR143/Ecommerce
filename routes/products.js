import express from 'express'
import { ProductsController } from '../controllers/ProductsController.js'
export const productRoutes = express.Router()

productRoutes.get('/', ProductsController.getAllProducts)

productRoutes.get('/:id', ProductsController.getProductById)
