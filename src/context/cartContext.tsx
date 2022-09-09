import { useContext, createContext, ReactNode, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartPtoviderProps = {
  children: ReactNode;
};

type CartContextProps = {
  getProductQuantity: (id: number) => number;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

export const CartContext = createContext({} as CartContextProps);
export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartPtoviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("cart", []);

  const [, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  function getProductQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  }

  function addToCart(id: number) {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { id, quantity: 1 }]);
    }
  }

  function removeFromCart(id: number) {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      if (item.quantity === 1) {
        setCartItems(cartItems.filter((item) => item.id !== id));
      } else {
        setCartItems(
          cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    }
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        getProductQuantity,
        addToCart,
        removeFromCart,
        clearCart,
        cartItems,
        openCart,
        closeCart,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
