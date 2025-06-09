import { UserModel } from '../models/UserModel.js'

export class UserController {
  static async login (req, res) {
    const { username, password } = req.body

    try {
      const { id, user, token } = await UserModel.login(username, password)
      if (user) {
        res.status(200)
          .cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60
          })
          .json({ message: 'Login successful', user: { id, user } })
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
      const { id, user, token } = await UserModel.register(username, password)

      if (user) {
        res.cookie('access_token', token, {
          httpOnly: true,
          sameSite: 'Strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60
        })
        res.status(201).json({ message: 'User registered successfully', user: { id, user } })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async logout (req, res) {
    res
      .clearCookie('access_token', {
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'production'
      })
      .status(200)
      .json({ message: 'Logged out successfully' })
  }
}
