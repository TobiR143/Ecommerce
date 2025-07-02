import { createContext, useContext, useEffect, useReducer } from "react";
import { API_URL } from "../constants/constants.js";
import { UserContext } from "../contexts/userContext.jsx";
import { reducerActions, reducer, initialState } from "../logic/reducer.js";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userData, loading: userLoading } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCart = async () => {
    dispatch({ type: reducerActions.FETCH_START });

    try {
      const response = await fetch(`${API_URL}/api/cart/${userData.id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.message) {
        dispatch({
          type: reducerActions.SET_FETCH_ERROR,
          payload: "There are no items in cart",
        });
        return;
      }
      dispatch({ type: reducerActions.GET_CART, payload: data });
    } catch (error) {
      dispatch({
        type: reducerActions.SET_FETCH_ERROR,
        payload: "Failed to fetch cart",
      });
    }
  };

  useEffect(() => {
    if (userLoading) return;

    if (!userData || !userData.username || !userData.id) {
      dispatch({
        type: reducerActions.SET_AUTH_ERROR,
        payload: "You must be logged to have a cart",
      });
      dispatch({ type: reducerActions.CLEAR_CART });
      return;
    }

    getCart();
  }, [userData, userLoading]);

  const addToCart = async (productId, quantity) => {
    if (userLoading || !userData) {
      dispatch({
        type: reducerActions.SET_AUTH_ERROR,
        payload: "You must be logged in to add an item to the cart",
      });
      return;
    }

    dispatch({ type: reducerActions.FETCH_START });

    try {
      const response = await fetch(`${API_URL}/api/cart/${userData.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (response.ok) {
        await getCart();
      } else {
        dispatch({
          type: reducerActions.SET_FETCH_ERROR,
          payload: "Cannot add item to cart",
        });
      }
    } catch (error) {
      dispatch({
        type: reducerActions.SET_FETCH_ERROR,
        payload: "Cannot add item to cart",
      });
    }
  };

  const removeFromCart = async (productId) => {
    if (userLoading) return;
    if (!userData) {
      dispatch({
        type: reducerActions.SET_AUTH_ERROR,
        payload: "You must be logged in to remove an item from the cart",
      });
      return;
    }

    dispatch({ type: reducerActions.FETCH_START });
    dispatch({ type: reducerActions.REMOVE_FROM_CART, payload: productId });
    try {
      await fetch(`${API_URL}/api/cart/${userData.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      await getCart();
    } catch (error) {
      dispatch({
        type: reducerActions.SET_FETCH_ERROR,
        payload: "Cannot remove item from cart",
      });
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (userLoading) return;
    if (!userData) {
      dispatch({
        type: reducerActions.SET_AUTH_ERROR,
        payload: "You must be logged in to update item quantity in the cart",
      });
      return;
    }

    dispatch({ type: reducerActions.FETCH_START });

    try {
      const response = await fetch(`${API_URL}/api/cart/${userData.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (response.ok) {
        await getCart();
      } else {
        dispatch({
          type: reducerActions.SET_FETCH_ERROR,
          payload: "Cannot update item quantity in cart",
        });
      }
    } catch (error) {
      dispatch({
        type: reducerActions.SET_FETCH_ERROR,
        payload: "Cannot update item quantity in cart",
      });
    }
  };

  return (
    <CartContext.Provider
      value={{ state, getCart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
