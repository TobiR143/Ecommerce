import { CartModel } from '../models/CartModel.js'

export class CartController {
  static async getCartByUserId (req, res) {
    const { userId } = req.params

    try {
      const cartItems = await CartModel.getCartByUserId(userId)
      if (cartItems.length === 0) {
        return res.status(404).json({ message: 'There are no items in cart' })
      }

      return res.status(200).json(cartItems)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async addToCart (req, res) {
    const { userId } = req.params
    const { productId, quantity } = req.body

    try {
      await CartModel.addToCart(userId, productId, quantity)
      return res.status(201).json({ message: 'Item added to cart successfully' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async updateCartItemQuantity (req, res) {
    const { userId } = req.params
    const { quantity, productId } = req.body

    try {
      await CartModel.updateCartItemQuantity(userId, productId, quantity)
      return res.status(200).json({ message: 'Item updated successfully' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async removeFromCart (req, res) {
    const { userId } = req.params
    const { productId } = req.body

    try {
      await CartModel.removeFromCart(userId, productId)
      return res.status(200).json({ message: 'Item removed from cart successfully' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  static async clearCart (req, res) {
    const { userId } = req.params

    try {
      await CartModel.clearCart(userId)
      return res.status(200).json({ message: 'Cart cleared successfully' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}
