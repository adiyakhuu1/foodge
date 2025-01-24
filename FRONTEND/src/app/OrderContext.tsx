"use client";
import { error } from "console";
import { createContext, SetStateAction, useContext, useState } from "react";
export type foodOrderItems = {
  food: string;
  quantity: number;
};

type cartContextType = {
  order: foodOrderItems[];
  setOrder: React.Dispatch<SetStateAction<foodOrderItems[]>>;
};
export const cartContext = createContext<cartContextType | null>(null);

export const CartProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [order, setOrder] = useState<foodOrderItems[]>([]);
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
