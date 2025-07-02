import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import "../styles/NavBar.css";
import { UserProfileIcon, ShoppingCart } from "../icons/Icons";
import { CartContext } from "../contexts/cartContext";
import { Loader } from "./Loader";

export const NavBar = () => {
  const {
    userData,
    handleLogout,
    loading: userLoading,
  } = useContext(UserContext);
  const { state } = useContext(CartContext);
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <nav className="nav">
      <div>
        <NavLink to="/" className="nav-li">
          Home
        </NavLink>
      </div>
      <div>
        <div>
          {userLoading ? (
            <Loader />
          ) : userData && userData.username ? (
            <li className="nav-li user-item">
              <div onClick={handleClick} className="username-container">
                <p className="username">{userData.username}</p>
                <UserProfileIcon />
                {selected && (
                  <div className="dropdown-menu">
                    <ul className="dropdown-list">
                      <li className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </li>
                      <li className="dropdown-item" onClick={handleClick}>
                        Close
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ) : (
            <NavLink to="/login" className="nav-li">
              <button className="login-button">Iniciar Sesión</button>
            </NavLink>
          )}

          <NavLink to="/cart" className="nav-li">
            {state.cart.length > 0 ? (
              <ShoppingCart quantity={state.cart.length} />
            ) : (
              <ShoppingCart quantity={0} />
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
