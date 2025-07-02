import { useEffect, useState } from "react"
import { API_URL } from "../constants/constants"

export const useCategories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async() => {
            const res = await fetch(`${API_URL}/api/categories`)
            const categories = await res.json()
            setCategories(categories)
        }

        fetchCategories()
    }, [])

    return { categories }
}