"use client";
import { useAuth } from "@clerk/nextjs";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type statusContextType = {
  status: string;
  setStatus: React.Dispatch<SetStateAction<string>>;
};
export const statusContext = createContext<statusContextType | null>(null);

export const StatusProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [status, setStatus] = useState<string>("");
  const { getToken } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        setStatus(token);
      }
    };
    fetchData();
  }, []);
  return (
    <statusContext.Provider value={{ status, setStatus }}>
      {children}
    </statusContext.Provider>
  );
};

export const useStatusContext = () => {
  const context = useContext(statusContext);
  if (!context) {
    throw new Error(`asmdfjlaksdmf`);
  }
  return context;
};
