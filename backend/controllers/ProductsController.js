import { ProductsModel } from '../models/ProductsModel.js'

export class ProductsController {
  static async getAllProducts (req, res) {
    const { category, maxPrice, limit, offset } = req.query

    try {
      const { products, hasMore } = await ProductsModel.getAllProducts(category, maxPrice, limit, offset)
      return res.status(200).json({ products, hasMore })
    } catch {
      return res.status(500).json({ error: 'Error fetching products' })
    }
  }

  static async getProductById (req, res) {
    const { id } = req.params

    if (!id) return res.status(400).json({ error: 'Product ID is required' })

    const product = await ProductsModel.getProductById(id)

    if (!product) return res.status(404).json({ error: 'Product not found' })

    return res.json(product)
  }
}
