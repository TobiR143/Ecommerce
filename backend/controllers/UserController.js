import { UserModel } from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {
  static async login (req, res) {
    const { username, password } = req.body

    try {
      if (!username || !password) return res.status(400).json({ message: 'Username and password are required' })

      const existingUser = await UserModel.getUserByUsername(username)
      if (!existingUser) return res.status(401).json({ message: 'Invalid username or password' })

      const isValidPassword = await bcrypt.compare(password, existingUser.password)
      if (!isValidPassword) return res.status(401).json({ message: 'Invalid username or password' })

      const token = jwt.sign(
        {
          id: existingUser.id,
          username: existingUser.username
        }, process.env.JWT_SECRET, { expiresIn: '1h' })

      if (token) {
        res.status(200)
          .cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 1000 * 60 * 60
          })
        res.json({ message: 'Login successful', user: { id: existingUser.id, user: existingUser.username } })
      } else {
        res.status(401).json({ message: 'Invalid username or password' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async register (req, res) {
    const { username, password } = req.body

    try {
      if (!username || !password) return res.status(400).json({ message: 'Username and password are required' })

      const existingUsername = await UserModel.getUserByUsername(username)

      if (existingUsername) return res.status(409).json({ message: 'User already exists' })

      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
      const { id, username: user } = await UserModel.register(username, hashedPassword)

      const newUser = {
        id,
        username: user
      }

      const token = jwt.sign(
        { user: newUser },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      if (user) {
        res.cookie('access_token', token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: 1000 * 60 * 60
        })
        res.status(201).json({ message: 'User registered successfully', user: newUser })
      } else {
        return res.status(400).json({ message: 'User registration failed' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async logout (req, res) {
    res
      .clearCookie('access_token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })
      .status(200)
      .json({ message: 'Logged out successfully' })
  }
}
