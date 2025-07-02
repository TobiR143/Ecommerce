import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants/constants";

export const useProductData = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({ 
      category: "", 
      id, 
      image: "", 
      name: "", 
      price: 0, 
      description: ""
  }) 


  useEffect(() => {
    const fetchProduct = async() => {
      setIsLoading(true)
      const res = await fetch(`${API_URL}/api/products/${id}`)
      const data = await res.json()
      setProduct(data)
      setIsLoading(false)
    }

    fetchProduct()
  }, [id]);

  return { isLoading, product };
};