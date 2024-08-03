import React, { createContext, useContext, useState } from 'react';
import { Cart, CartProduct } from '@/components/product/Cart.type';

export const CartContext = createContext<{
  cart: Cart;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: string) => void;
}>({
  cart: { products: [], total: 0 },
  setCart: () => {},
  clearCart: () => {},
  addProduct: () => {},
  removeProduct: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { products: [], total: 0 };
  });

  const setStateAndLocalStorage = (newCart: Cart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setStateAndLocalStorage({ products: [], total: 0 });
  };

  const addProduct = (product: CartProduct) => {
    const productAlreadyInCart = cart.products.find(
      cartProduct => cartProduct.id === product.id,
    );

    if (productAlreadyInCart) {
      const updatedProducts = cart.products.map(cartProduct =>
        cartProduct.id === product.id
          ? {
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
              priceWithExtras:
                cartProduct.priceWithExtras + product.priceWithExtras,
              extras: product.extras,
            }
          : cartProduct,
      );

      setStateAndLocalStorage({
        products: updatedProducts,
        total: cart.total + product.priceWithExtras,
      });
    } else {
      setStateAndLocalStorage({
        products: [...cart.products, product],
        total: cart.total + product.priceWithExtras,
      });
    }
  };

  const removeProduct = (productId: string) => {
    const productToRemove = cart.products.find(
      cartProduct => cartProduct.id === productId,
    );

    if (!productToRemove) return;

    const updatedProducts = cart.products.filter(
      cartProduct => cartProduct.id !== productId,
    );

    setStateAndLocalStorage({
      products: updatedProducts,
      total: cart.total - productToRemove.priceWithExtras,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        clearCart,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
