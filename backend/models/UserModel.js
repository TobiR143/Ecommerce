import { db } from '../db/db.js'

export class UserModel {
  static async register (username, password) {
    try {
      const query = 'INSERT INTO User (username, password) VALUES (?, ?)'
      await db.execute(query, [username, password])

      const response = await db.execute('SELECT id FROM User WHERE username = ?', [username])

      const newUser = { id: response.rows[0].id, username }

      return newUser
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
