import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../contexts/cartContext";
import { CaretDownIcon, CaretUpIcon } from "../icons/Icons";

export const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const latestQuantity = useRef(item.quantity);
  const timeoutRef = useRef(null);
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  const handleClick = (productId) => {
    removeFromCart(productId);
  };

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtract = (productId) => {
    if (quantity <= 1) {
      removeFromCart(productId);
      return;
    }
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    const diff = quantity - latestQuantity.current;
    if (diff === 0) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      updateQuantity(item.id, diff);
      latestQuantity.current = quantity;
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [quantity]);

  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img className="cart-item-image" src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details-container">
        <div className="cart-item-details">
          <h3 className="cart-item-details-name">{item.name}</h3>
          <p className="cart-item-details-price">$ {item.price}</p>
        </div>
        <div className="cart-item-actions">
          <div className="cart-item-update-quantity">
            <button
              onClick={() => handleSubtract(item.id)}
              className="cart-item-quantity-subtract"
            >
              <CaretDownIcon />
            </button>
            <p className="cart-item-quantity">{quantity}</p>
            <button onClick={handleAdd} className="cart-item-quantity-add">
              <CaretUpIcon />
            </button>
          </div>
          <div className="cart-item-button-container">
            <button
              onClick={() => handleClick(item.id)}
              className="cart-item-button-remove"
            >
              Remove from cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
