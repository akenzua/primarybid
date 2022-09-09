import { render, screen } from "@testing-library/react";

import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";
import { BrowserRouter } from "react-router-dom";
import { Products } from "./Products";

const { Provider: AuthProvider } = AuthContext;
const { Provider: ContextProvider } = CartContext;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    category: "women",
  }),
}));

function renderProduct() {
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
        <Products />
      </ContextProvider>
    </AuthProvider>,
    { wrapper: BrowserRouter }
  );
}

test("renders category page", async () => {
  renderProduct();

  const productHeading = await screen.findByRole("heading", {
    name: "Products",
  });
  expect(productHeading).toBeInTheDocument();

  const niceGown = await screen.findByText("Nice Gown");
  expect(niceGown).toBeInTheDocument();
});
