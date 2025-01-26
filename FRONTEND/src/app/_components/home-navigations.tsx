"use client";
import Logo from "./logo";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Pfp } from "./_reusable/pfp";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import DeliveryAddress from "./_reusable/delivery-address-button";
import Cart from "./_reusable/cart-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContext, useEffect, useState } from "react";
import { cartContext, useCartContext } from "../OrderContext";
import { useFoodContext } from "../FoodInfoContext";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Navigaion() {
  const [count, setCount] = useState(1);
  const [token, setToken] = useState("");
  const [response, setResponse] = useState("");
  const { order } = useCartContext();
  const { foodsInfo } = useFoodContext();
  const [isFailed, setFailed] = useState<boolean>(false);
  // const [totalPrice, setTotalPrice] = useState<number>();
  const { getToken } = useAuth();

  const changedOrder = order;

  const calculateTotalPrice = (): { totalPrice: number; price: number } => {
    const price = foodsInfo.reduce((price, food, index) => {
      price += food.price * order[index].quantity;
      // setTotalPrice(prev);

      return price;
    }, 0);
    const totalPrice = price + 0.99;
    return { totalPrice, price };
  };
  const { price } = calculateTotalPrice();
  const { totalPrice } = calculateTotalPrice();
  // const [form, setForm] = useState({
  useEffect(() => {
    setFailed(false);
  }, [order]);
  useEffect(() => {
    const dosomething = async () => {
      const token = await getToken();
      if (token) {
        setToken(token);
      }
    };
    dosomething();
  }, []);
  // });
  const form = {
    user: "67933be24b8118f8d9c34b34",
    totalPrice: totalPrice,
    foodOrderItems: order,
    status: "PENDING",
  };

  const addOrder = async () => {
    console.log("form", form);
    console.log("order", order);
    const senddata = await fetch(`http://localhost:5000/foodOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(form),
    });
    const response = await senddata.json();
    setResponse(response.message);
  };

  return (
    <div className="bg-primary h-17 w-full justify-items-center">
      <div className="flex items-center justify-between w-[90%]">
        <div>
          <Logo style="text-background" />
        </div>
        <div className="flex gap-3">
          <DeliveryAddress />
          <Sheet>
            <SheetTrigger>
              <Cart />
            </SheetTrigger>
            <SheetContent className="bg-neutral-700 w-[535px]">
              <SheetHeader>
                <SheetTitle className="text-background">My Cart</SheetTitle>
                <Tabs defaultValue="cart" className="">
                  <TabsList className="w-full rounded-full ">
                    <TabsTrigger value="cart" className="w-1/2 rounded-full">
                      Cart
                    </TabsTrigger>
                    <TabsTrigger value="order" className="w-1/2 rounded-full">
                      Order
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="cart">
                    <div className="flex flex-col gap-5">
                      <div className="bg-background h-[440px] w-[336px] border rounded-2xl p-2 overflow-scroll scrollbar-none">
                        <div className=" relative">
                          <div>
                            {foodsInfo.map((food, index) => (
                              <div
                                key={food._id}
                                className={`h-40 w-full flex gap-2 items-center bg-secondary rounded-lg`}
                              >
                                <div className="w-[129px] h-[129px] content-center">
                                  <Image
                                    className="w-[350px] h-[125px] bg-cover bg-center rounded-xl"
                                    src={
                                      food.image
                                        ? food.image
                                        : `https://www.foodandwine.com/thmb/bT5-sIRTEMDImFAqBmEAzG5T5A4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg`
                                    }
                                    priority={false}
                                    width={1500}
                                    height={1000}
                                    alt="foodpic"
                                  />
                                </div>
                                <div className="w-2/3 flex flex-col justify-between gap-4">
                                  <div>
                                    <div className="text-red-500 font-bold">
                                      {food.foodName}
                                    </div>
                                    <div className="h-12 truncate text-wrap text-xs text-foreground">
                                      {food.ingredients}
                                    </div>
                                  </div>
                                  <div className="flex justify-between font-bold text-foreground">
                                    <div className="flex gap-2">
                                      {/* <div
                            className=" cursor-pointer"
                            onClick={() => setCount((p) => p - 1)}>
                            -
                          </div> */}
                                      <button
                                        className="w-9 h-9"
                                        onClick={() => {
                                          changedOrder[index].quantity -= 1;
                                          console.log(
                                            changedOrder[index].quantity
                                          );
                                          setCount(count + 1);
                                        }}
                                      >
                                        -
                                      </button>
                                      <div className="w-9 h-9 content-center justify-items-center">
                                        <div>
                                          {changedOrder[index].quantity}
                                        </div>
                                      </div>
                                      <button
                                        className="w-9 h-9"
                                        onClick={() => {
                                          changedOrder[index].quantity += 1;
                                          console.log(
                                            changedOrder[index].quantity
                                          );
                                          setCount(count + 1);
                                        }}
                                      >
                                        +
                                      </button>
                                      {/* <div
                            className=" cursor-pointer"
                            onClick={() => setCount((p) => p + 1)}>
                            +
                          </div> */}
                                    </div>
                                    <div className="w-9 h-9 content-center justify-items-center">
                                      ${food.price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className=" flex justify-center cursor-pointer">
                          <SheetClose asChild>
                            <div className="text-center text-sm font-semibold text-red-500 w-full border border-red-500 rounded-full p-2 content-center">
                              Add food
                            </div>
                          </SheetClose>
                        </div>
                      </div>
                      <div className="h-[240px] bg-background rounded-xl relative p-3">
                        <h1 className="font-bold">Payment Info</h1>
                        <div className="flex justify-between p-3">
                          <div>Items</div>
                          <div>${price}</div>
                        </div>
                        <div className="flex justify-between p-3">
                          <div>Shipping</div>
                          <div>$0.99</div>
                        </div>
                        <div className="flex justify-between p-3 border-t border-dashed border-foreground-50">
                          <div>Total</div>
                          <div>${totalPrice}</div>
                        </div>
                        <div
                          onClick={() => {
                            addOrder();
                            setFailed(true);
                          }}
                          className="bottom-2 absolute border border-red-500 w-10/12 rounded-full justify-center flex right-1/2 left-1/2 transform -translate-x-1/2 cursor-pointer"
                        >
                          Checkout
                          {isFailed && (
                            <div>
                              {response !== "success" ? (
                                <div> - (Please Wait!)</div>
                              ) : (
                                <div> - (Done)</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="order">
                    Change your password here.
                  </TabsContent>
                </Tabs>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Pfp />
        </div>
      </div>
    </div>
  );
}
