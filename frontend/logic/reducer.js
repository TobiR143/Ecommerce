export const initialState = {
  cart: [],
  loading: false,
  error: null,
};

export const reducerActions = {
    SET_AUTH_ERROR: "SET_AUTH_ERROR",
    FETCH_START: "FETCH_START",
    SET_FETCH_ERROR: "SET_FETCH_ERROR",
    GET_CART: "GET_CART",
    ADD_TO_CART: "ADD_TO_CART",
    CLEAR_CART: "CLEAR_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
}

export const reducer = (state, action) => {
  switch (action.type) {
    case reducerActions.SET_AUTH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case reducerActions.FETCH_START:
      return { ...state, loading: true, error: null };
    case reducerActions.SET_FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case reducerActions.GET_CART:
      return { ...state, loading: false, cart: action.payload };
    case reducerActions.CLEAR_CART:
      return { ...state, loading: false, error: null, cart: [] };
    case reducerActions.REMOVE_FROM_CART:
      return {
        ...state,
        loading: false,
        error: null,
        cart: state.cart.filter(
          (item) => item.id !== action.payload
        )
      }
  }
};