import { createContext, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AddProductInCartUseCase } from "../core/application/cart/addProductInCartUseCase";
import { ClearCartUseCase } from "../core/application/cart/clearCartUseCase";
import { GetCartUseCase } from "../core/application/cart/getCartUseCase";
import { RemoveProductFromCartUseCase } from "../core/application/cart/removeProductFromCartUseCase";
import { Cart } from "../core/domain/entities/cart";
import { Product } from "../core/domain/entities/product";
import { container, Registry } from "../core/infra/containerRegistry";

export type CartContextType = {
    cart: Cart;
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
    clear: () => void;
    reload: () => void;
}

const defaultContext: CartContextType = {
    cart: new Cart({products: []}),
    addProduct: (product: Product) => {},
    removeProduct: (productId: number) => {},
    clear: () => {},
    reload: () => {}
}

export const CartContext = createContext(defaultContext);

const getCartUseCase = container.get<GetCartUseCase>(Registry.GetCartUseCase);
const addProductInCartUseCase = container.get<AddProductInCartUseCase>(Registry.AddProductInCartUseCase);
const removeProductFromCartUseCase = container.get<RemoveProductFromCartUseCase>(Registry.RemoveProductFromCartUseCase);
const clearCartUseCase = container.get<ClearCartUseCase>(Registry.ClearCartUseCase);

export const CartProvider = ({ children }: PropsWithChildren) => {
    const [cart, setCart] = useState<Cart>(defaultContext.cart);
  
    const addProduct = useCallback((product: Product) => {
      const cart = addProductInCartUseCase.execute(product);
      setCart(cart);
    }, []);
  
    const removeProduct = useCallback((productId: number) => {
        const cart = removeProductFromCartUseCase.execute(productId);
        setCart(cart);
    }, []);
  
    const clear = useCallback(() => {
        const cart = clearCartUseCase.execute();
        setCart(cart);
    }, []);

    const reload = useCallback(() => {
      const cart = getCartUseCase.execute();
      setCart(cart);
    }, []);

    useEffect(() => {
      reload();
    }, [reload]);
  
    return (
      <CartContext.Provider
        value={{
          cart,
          addProduct,
          removeProduct,
          clear,
          reload
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };