import express from 'express'
import { UserController } from '../controllers/UserController.js'
export const userRoutes = express.Router()

userRoutes.post('/login', UserController.login)
userRoutes.post('/register', UserController.register)
userRoutes.post('/logout', UserController.logout)
