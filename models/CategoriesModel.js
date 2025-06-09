import { db } from '../db/db.js'

export class CategoriesModel {
  static async getAllCategories () {
    try {
      const response = await db.execute('SELECT * FROM category')
      const categories = response.rows
      return categories
    } catch {
      throw new Error('Error fetching categories')
    }
  }
}
