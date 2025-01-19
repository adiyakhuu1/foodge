import Logo from "./logo";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Pfp } from "./_reusable/pfp";
import { Button } from "@/components/ui/button";
export default function Navigaion() {
  return (
    <div className="bg-primary h-17 w-full justify-items-center">
      <div className="flex items-center justify-between w-[90%]">
        <div>
          <Logo style="text-background" />
        </div>
        <div className="flex gap-3">
          <Button className="flex px-4 p-2 gap-1 bg-background rounded-3xl items-center hover:bg-secondary">
            <IoLocationOutline className="text-2xl text-red-500" />
            <div className="text-red-500">Delivery address: </div>
            <div className="text-foreground">Add Location</div>
            <IoIosArrowForward />
          </Button>
          <Button className="p-3 bg-secondary rounded-full hover:bg-background">
            <CiShoppingCart className="text-xl text-foreground" />
          </Button>

          <Pfp />
        </div>
      </div>
    </div>
  );
}
