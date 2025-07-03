import { useContext, useState } from "react";
import { useProductData } from "../hooks/useProductData.js";
import "../styles/ProductPage.css";
import { CaretDownIcon, CaretUpIcon } from "../icons/Icons.jsx";
import { Loader } from "../components/Loader.jsx";
import { CartContext } from "../contexts/cartContext.jsx";

export const ProductPage = () => {
  const { isLoading, product } = useProductData();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  console.log(product, isLoading);

  const handleClick = () => {
    addToCart(product.id, quantity);
    setQuantity(1);
  };

  const handleSubtract = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <article className="product">
            <div className="product-img-container">
              <img
                className="product-data-image"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="product-data-container">
              <h1 className="product-data-name">{product.name}</h1>
              <p className="product-data-price">${product.price}</p>
              <div className="product-data-interactions">
                <button
                  onClick={handleClick}
                  className="product-data-add-to-cart-button"
                >
                  Add to cart
                </button>
                <div className="product-data-quantity-interaction">
                  <button
                    onClick={handleSubtract}
                    className="product-data-quantity-subtract"
                  >
                    <CaretDownIcon />
                  </button>
                  <p className="product-data-quantity">{quantity}</p>
                  <button
                    onClick={handleAdd}
                    className="product-data-quantity-add"
                  >
                    <CaretUpIcon />
                  </button>
                </div>
              </div>
            </div>
          </article>

          <div className="product-description-container">
            <h3 className="product-description-title">Description</h3>
            <p className="product-description">{product.description}</p>
          </div>
        </>
      )}
    </>
  );
};
