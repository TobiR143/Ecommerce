import { CategoriesModel } from '../models/CategoriesModel.js'

export class CategoriesController {
  static async getAllCategories (req, res) {
    try {
      const categories = await CategoriesModel.getAllCategories()
      if (categories.length === 0) return res.status(404).json({ error: 'No categories found' })

      return res.status(200).json(categories)
    } catch {
      return res.status(500).json({ error: 'Error fetching categories' })
    }
  }
}
