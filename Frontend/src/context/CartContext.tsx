import { Cart, CartProduct } from '@/components/product/Cart.type';
import React, { createContext, useContext } from 'react';

export const CartContext = createContext<{
  cart: Cart;
  clearCart: () => void;
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: string) => void;
}>({
  cart: { products: [], total: 0 },
  clearCart: () => {},
  addProduct: () => {},
  removeProduct: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = React.useState<Cart>(
    (localStorage.getItem('cart') as unknown as Cart) || {
      products: [],
      total: 0,
    },
  );

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
      productAlreadyInCart.quantity++;
      productAlreadyInCart.priceWithExtras += product.priceWithExtras;
      productAlreadyInCart.extras = product.extras;
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

    const newCart = {
      products: cart.products.filter(
        cartProduct => cartProduct.id !== productId,
      ),
      total: cart.total - productToRemove.priceWithExtras,
    };

    setStateAndLocalStorage(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
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
