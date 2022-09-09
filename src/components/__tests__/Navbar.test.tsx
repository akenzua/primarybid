import React from "react";
import { render, screen } from "@testing-library/react";

import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "../Navbar";

const { Provider: AuthProvider } = AuthContext;
const { Provider: ContextProvider } = CartContext;

function renderCart() {
  render(
    <AuthProvider
      value={{ isAuthenticated: true, setIsAuthenticated: () => {} }}
    >
      <ContextProvider
        value={{
          cartItems: [],
          getProductQuantity: () => 1,
          addToCart: () => {},
          removeFromCart: () => {},
          clearCart: () => {},
          openCart: () => {},
          closeCart: () => {},
          cartQuantity: 0,
        }}
      >
        <Navbar />
      </ContextProvider>
    </AuthProvider>,
    { wrapper: BrowserRouter }
  );
}

test("renders navbar", async () => {
  renderCart();

  const cart = await screen.findByRole("link", { name: "Categories" });
  expect(cart).toBeInTheDocument();

  const logout = await screen.findByRole("button", { name: "Sign Out" });
  expect(logout).toBeInTheDocument();
});
