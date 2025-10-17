import { db } from '../db/db.js'

export class UserModel {
  static async register (username, password) {
    try {
      await db.execute('INSERT INTO "User" (username, password) VALUES (?, ?)', [username, password])
      const result = await db.execute('SELECT id FROM "User" WHERE username = ?', [username])

      const id = result.rows?.[0]?.[0]
      return { id, username }
    } catch (error) {
      throw new Error('Error registering user: ' + error.message)
    }
  }

  static async getUserByUsername (username) {
    try {
      const result = await db.execute('SELECT * FROM "User" WHERE username = ?', [username])
      if (!result.rows?.length) return undefined

      const columns = result.columns
      const values = result.rows[0]
      const user = Object.fromEntries(columns.map((c, i) => [c, values[i]]))

      return user
    } catch (error) {
      throw new Error(`Error searching for user: ${username}`)
    }
  }
}
