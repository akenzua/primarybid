import React from "react";
import { render, screen } from "@testing-library/react";

import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";
import { BrowserRouter } from "react-router-dom";
import { Categories } from "./Categories";

const { Provider: AuthProvider } = AuthContext;
const { Provider: ContextProvider } = CartContext;

function renderCategory() {
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
        <Categories />
      </ContextProvider>
    </AuthProvider>,
    { wrapper: BrowserRouter }
  );
}

test("renders category page", async () => {
  renderCategory();

  const categories = await screen.findByRole("heading", { name: "Categories" });
  expect(categories).toBeInTheDocument();

  const category = await screen.findByRole("link", { name: "women" });
  expect(category).toBeInTheDocument();
});
