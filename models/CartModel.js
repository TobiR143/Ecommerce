import { db } from '../db/db.js'

export class CartModel {
  static async getCartByUserId (userId) {
    try {
      const sql = `
        SELECT 
          p.id, 
          p.name, 
          p.image, 
          p.price, 
          ci.quantity, 
          ci.total 
        FROM CartItem ci 
        JOIN Product p ON (ci.idProduct = p.id) 
        WHERE ci.idUser = ?
      `
      const response = await db.execute(sql, [userId])
      const cartItems = response.rows
      return cartItems
    } catch (error) {
      throw new Error('Error retrieving cart items: ' + error.message)
    }
  }

  static async addToCart (userId, productId, quantity) {
    try {
      const isInCart = await this.isItemInCart(userId, productId)

      if (isInCart) this.updateCartItemQuantity(userId, productId, quantity)
      else {
        const sqlProductQuery = await db.execute(
          'SELECT price FROM Product WHERE id = ?',
          [productId]
        )
        const productPrice = sqlProductQuery.rows[0].price
        const sqlInsert = `
        INSERT INTO CartItem (idUser, idProduct, quantity, total)
        VALUES (?, ?, ?, ?)`
        await db.execute(sqlInsert, [userId, productId, quantity, productPrice * quantity])
      }
    } catch (error) {
      throw new Error('Error adding item to cart: ' + error.message)
    }
  }

  static async updateCartItemQuantity (userId, productId, quantity) {
    try {
      const isInCart = await this.isItemInCart(userId, productId)

      if (!isInCart) {
        throw new Error('Item not found in cart')
      }

      const sqlProductQuery = await db.execute(
        'SELECT price FROM Product WHERE id = ?',
        [productId]
      )

      const productPrice = sqlProductQuery.rows[0].price
      const priceUpdate = productPrice * quantity

      const sqlUpdate = `
          UPDATE CartItem
          SET quantity = quantity + ?, 
              total = total + ?
          WHERE idUser = ? AND idProduct = ?`
      await db.execute(sqlUpdate, [quantity, priceUpdate, userId, productId])
    } catch (error) {
      throw new Error('Error updating cart item quantity: ' + error.message)
    }
  }

  static async removeFromCart (userId, productId) {
    try {
      const isInCart = await this.isItemInCart(userId, productId)

      if (!isInCart) {
        throw new Error('Item not found in cart')
      }

      await db.execute(
        'DELETE FROM CartItem WHERE idUser = ? AND idProduct = ?',
        [userId, productId]
      )
    } catch (error) {
      throw new Error('Error removing item from cart: ' + error.message)
    }
  }

  static async clearCart (userId) {
    try {
      await db.execute('DELETE FROM CartItem WHERE idUser = ?', [userId])
    } catch (error) {
      throw new Error('Error clearing cart: ' + error.message)
    }
  }

  static async isItemInCart (userId, productId) {
    try {
      const sqlQuery = await db.execute(
        'SELECT * FROM CartItem WHERE idUser = ? AND idProduct = ?',
        [userId, productId]
      )
      const isInCart = sqlQuery.rows.length > 0
      return isInCart
    } catch (error) {
      throw new Error('Error checking if item is in cart' + error.message)
    }
  }
}
