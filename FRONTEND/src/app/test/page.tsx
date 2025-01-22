import React, { createContext, useContext, useState } from "react";

type Order = {
  food: string;
  quantity: number;
};

type CartContextType = {
  order: Order[];
  setOrder: Function;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState<Order[]>([]);

  return (
    <CartContext.Provider value={{ order, setOrder }}>
      {children}
    </CartContext.Provider>
  );
};
