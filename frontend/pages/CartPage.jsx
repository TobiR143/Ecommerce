import { useContext } from "react";
import { CartContext } from "../contexts/cartContext.jsx";
import { CaretDownIcon, CaretUpIcon } from "../icons/Icons.jsx";
import "../styles/CartPage.css";
import { CartItem } from "../components/CartItem.jsx";

export const CartPage = () => {
  const { state } = useContext(CartContext);

  return (
    <div className="cart-items-container">
      {state.cart.length === 0 && (
        <div className="no-products">
          <p>No items in Cart</p>
          <a className="redirect-home" href="/">
            Go back Home
          </a>
        </div>
      )}
      {state.cart.map((item) => {
        return <CartItem key={item.id} item={item} />;
      })}
    </div>
  );
};
