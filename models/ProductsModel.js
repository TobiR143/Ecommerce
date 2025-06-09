import { db } from '../db/db.js'

export class ProductsModel {
  static async getAllProducts (category, maxPrice, limit = 10, offset = 0) {
    let query = 'SELECT id, name, image, price, category FROM product'
    const params = []

    if (category || maxPrice) {
      query += ' WHERE'
      if (category) {
        query += ' category = ?'
        params.push(category)
      }
      if (maxPrice) {
        if (category) {
          query += ' AND price <= ?'
        }
        params.push(maxPrice)
      }
    }

    query += ' LIMIT ? OFFSET ?'
    params.push(limit, offset)

    try {
      const response = await db.execute(query, params)
      const products = response.rows

      return products
    } catch {
      throw new Error('Error fetching products')
    }
  }

  static async getProductById (id) {
    try {
      const response = await db.execute('SELECT * FROM product WHERE id = ?', [id])
      const product = response.rows[0]

      return product
    } catch {
      throw new Error('Could found product with the given ID')
    }
  }
}
