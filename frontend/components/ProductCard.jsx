import { useContext } from "react";
import "../styles/ProductCard.css";
import { CartContext } from "../contexts/cartContext";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const { userData } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClick = async ({ productId, quantity = 1 }) => {
    if (!userData) navigate("/login");
    await addToCart(productId, quantity);
  };

  return (
    <article className="product-card">
      <img className="product-image" src={product.image} alt={product.name} />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>

      <div className="product-actions">
        <a
          href={`/product/${product.id}`}
          className="view-details-link"
          rel="noopener noreferrer"
        >
          View Details
        </a>
        <button
          onClick={() => handleClick({ productId: product.id, quantity: 1 })}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};
