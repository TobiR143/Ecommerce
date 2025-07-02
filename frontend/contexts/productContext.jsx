import { createContext, useState, useEffect, useRef } from "react";
import { API_URL } from "../constants/constants";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: "All Categories",
    maxPrice: null,
  });
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const resultsCache = useRef(new Map());

  useEffect(() => {
    setProducts([]);
    setOffset(0);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    const searchKey = JSON.stringify(filters) + "-" + offset;

    if (resultsCache.current.has(searchKey)) {
      const cachedData = resultsCache.current.get(searchKey);
      if (offset === 0) {
        setProducts(cachedData.products);
      } else {
        setProducts((prev) => [...prev, ...cachedData.products]);
      }
      setHasMore(cachedData.hasMore);
      return;
    }

    const fetchFilteredProducts = async () => {
      setIsLoading(true);

      const params = new URLSearchParams();

      if (filters.category !== "All Categories") {
        params.append("category", filters.category);
      }

      if (filters.maxPrice) {
        params.append("maxPrice", filters.maxPrice);
      }

      params.append("limit", 20);
      params.append("offset", offset);

      try {
        const res = await fetch(`${API_URL}/api/products?${params.toString()}`);
        const data = await res.json();

        if (!data.products) {
          setHasMore(false);
          return;
        }

        resultsCache.current.set(searchKey, data);

        if (offset === 0) {
          setProducts(data.products);
        } else {
          setProducts((prev) => [...prev, ...data.products]);
        }

        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [filters, offset]);

  return (
    <ProductContext.Provider
      value={{
        offset,
        setOffset,
        hasMore,
        products,
        filters,
        setFilters,
        isLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
