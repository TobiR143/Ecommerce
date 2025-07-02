import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(403).json({ message: 'Access not authorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  next()
}
