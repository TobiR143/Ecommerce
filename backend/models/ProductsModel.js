import { db } from '../db/db.js'

export class ProductsModel {
  static async getAllProducts (category, maxPrice, limit = 20, offset = 0) {
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
        } else query += ' price <= ?'
        params.push(maxPrice)
      }
    }

    query += ' LIMIT ? OFFSET ?'
    params.push(Number(limit) + 1, Number(offset))

    try {
      const response = await db.execute(query, params)
      const rows = response.rows

      const products = rows.slice(0, limit)
      const hasMore = rows.length > limit

      return { products, hasMore }
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
