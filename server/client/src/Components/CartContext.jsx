import { createContext, useReducer } from "react";
import { FoodReducer } from "./FoodReducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FoodReducer, []);

  return (
    <div>
      {children !== undefined && (
        <CartContext.Provider value={{ state, dispatch }}>
          {children}
        </CartContext.Provider>
      )}
    </div>
  );
};

export default CartContext;
