import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./App.jsx";
import { UserProvider } from "../contexts/userContext.jsx";
import { NavBar } from "../components/NavBar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage.jsx";
import { CartPage } from "../pages/CartPage.jsx";
import { ProductPage } from "../pages/ProductPage.jsx";
import { ProductProvider } from "../contexts/productContext.jsx";
import { CartProvider } from "../contexts/cartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
