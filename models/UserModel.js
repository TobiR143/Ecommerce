import { db } from '../db/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserModel {
  static async login (username, password) {
    try {
      const user = await this.getUserByUsername(username)

      if (!user) {
        throw new Error('User not found')
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        throw new Error('Password is incorrect')
      }

      const userVerificated = {
        id: user.id,
        username: user.username
      }

      const token = jwt.sign({ id: userVerificated.id, username: userVerificated.username }, process.env.JWT_SECRET, { expiresIn: '1h' })

      return {
        id: userVerificated.id,
        user: userVerificated.username,
        token
      }
    } catch (error) {
      throw new Error('Error loging in: ' + error.message)
    }
  }

  static async register (username, password) {
    try {
      const user = await this.getUserByUsername(username)

      if (user) {
        throw new Error('User already exists')
      } else {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
        const query = 'INSERT INTO User (username, password) VALUES (?, ?)'
        await db.execute(query, [username, hashedPassword])

        const response = await db.execute('SELECT id FROM User WHERE username = ?', [username])

        const newUser = { id: response.rows[0], username, password: hashedPassword }

        const token = jwt.sign(
          { id: newUser.id, username: newUser.username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        )

        return {
          id: newUser.id,
          user: newUser.username,
          token
        }
      }
    } catch (error) {
      throw new Error('Error registering user: ' + error.message)
    }
  }

  static async getUserByUsername (username) {
    try {
      const query = 'SELECT * FROM User WHERE username = ?'
      const response = await db.execute(query, [username])
      const user = response.rows[0]

      if (!user) {
        return undefined
      }

      return {
        id: user.id,
        username: user.username,
        password: user.password
      }
    } catch (error) {
      throw new Error(`Error searching for user: ${username}`)
    }
  }
}
