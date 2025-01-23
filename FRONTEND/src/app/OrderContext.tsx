"use client";
import { error } from "console";
import { createContext, SetStateAction, useContext, useState } from "react";
type Order = {
  food: string;
  quantity: number;
};

type cartContextType = {
  order: Order[];
  setOrder: React.Dispatch<SetStateAction<Order[]>>;
};
export const cartContext = createContext<cartContextType | null>(null);

export const CartProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [order, setOrder] = useState<Order[]>([]);
  return (
    <cartContext.Provider value={{ order, setOrder }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error(`asmdfjlaksdmf`);
  }
  return context;
};
