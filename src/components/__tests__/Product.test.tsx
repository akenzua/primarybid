import { render, screen } from "@testing-library/react";
import { Product } from "../Product";
import { CartContext } from "../../context/cartContext";

const { Provider: ContextProvider } = CartContext;

const ProductProps = {
  id: 1,
  title: "Nice Gown",
  price: 100,
  image: "nice-gown.jpg",
  description: "A nice gown",
  category: "women",
};

function renderProduct() {
  render(
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
      <Product {...ProductProps} />
    </ContextProvider>
  );
}

test("renders product component", async () => {
  renderProduct();
  expect(screen.getByText("Nice Gown")).toBeInTheDocument();
});
