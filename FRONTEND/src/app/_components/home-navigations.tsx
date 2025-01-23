"use client";
import Logo from "./logo";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Pfp } from "./_reusable/pfp";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import DeliveryAddress from "./_reusable/delivery-address-button";
import Cart from "./_reusable/cart-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContext, useState } from "react";
import { cartContext, useCartContext } from "../OrderContext";
import { useFoodContext } from "../FoodInfoContext";
import Image from "next/image";
export default function Navigaion() {
  const [count, setCount] = useState(1);
  const { order } = useCartContext();
  const { foodsInfo } = useFoodContext();
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
            <SheetContent>
              <SheetHeader>
                <SheetTitle>My Cart</SheetTitle>

                {foodsInfo.map((food) => (
                  <div
                    key={food._id}
                    className="h-40 w-full bg-secondary flex gap-2 items-center"
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
                    <div className="w-2/3 font-bold flex flex-col justify-between gap-4">
                      <div>
                        <div className="text-red-500">{food.foodName}</div>
                        <div className="h-12 truncate text-xs">
                          {food.ingredients}
                        </div>
                      </div>
                      <div className="flex justify-around">
                        <div className="flex gap-7">
                          <div
                            className=" cursor-pointer"
                            onClick={() => setCount((p) => p - 1)}
                          >
                            -
                          </div>
                          <div>{count}</div>
                          <div
                            className=" cursor-pointer"
                            onClick={() => setCount((p) => p + 1)}
                          >
                            +
                          </div>
                        </div>
                        <div>${food.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Pfp />
        </div>
      </div>
    </div>
  );
}
