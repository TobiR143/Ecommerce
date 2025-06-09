import express from 'express'
import { CategoriesController } from '../controllers/CategoriesController.js'
export const categoryRoutes = express.Router()

categoryRoutes.get('/', CategoriesController.getAllCategories)
