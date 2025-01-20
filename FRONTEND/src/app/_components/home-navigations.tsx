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
export default function Navigaion() {
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
                <SheetTitle>Title</SheetTitle>

                <SheetDescription>Description</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Pfp />
        </div>
      </div>
    </div>
  );
}
