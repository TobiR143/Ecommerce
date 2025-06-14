import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { productRoutes } from './routes/products.js'
import { categoryRoutes } from './routes/categories.js'
import { cartRoutes } from './routes/cart.js'
import { userRoutes } from './routes/user.js'
import { verifyToken } from './middlewares/verifyToken.js'
import { corsOptions } from './config/corsOptions.js'

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.use(cors(corsOptions))
app.use(cookieParser())

app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'You have access to this protected route', user: req.user })
})

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`))
