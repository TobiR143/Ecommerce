import { ProductCard } from "../components/ProductCard.jsx";
import "../styles/App.css";
import { Filters } from "../components/Filters.jsx";
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext.jsx";
import { Loader } from "../components/Loader.jsx";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.js";

function HomePage() {
  const { products, isLoading, offset, setOffset, hasMore } =
    useContext(ProductContext);
  const refPagination = useInfiniteScroll({
    hasMore,
    loading: isLoading,
    onIntersect: () => setOffset(offset + 20),
  });

  return (
    <>
      <Filters />
      {products.length === 0 && !isLoading ? (
        <div className="no-products">
          <p>No products found</p>
        </div>
      ) : (
        <>
          <section className="product-list">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
          {isLoading && <Loader />}
          {hasMore ? (
            <div ref={refPagination}>hasMore</div>
          ) : (
            <div className="no-more-products">No more products</div>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
