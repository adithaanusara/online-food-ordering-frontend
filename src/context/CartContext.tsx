import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartFoodItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  description?: string;
};

export type CartItem = CartFoodItem & {
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (food: CartFoodItem) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  removeFromCart: (foodId: string) => void;
  clearCart: () => void;
  isInCart: (foodId: string) => boolean;
};

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = "foodexpress_cart_items";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food: CartFoodItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === food.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...food,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === foodId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const removeFromCart = (foodId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== foodId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (foodId: string) => {
    return cartItems.some((item) => item.id === foodId);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}