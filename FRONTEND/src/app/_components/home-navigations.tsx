import Logo from "./logo";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
export default function Navigaion() {
  return (
    <div className="bg-primary h-17 w-full justify-items-center">
      <div className="flex items-center justify-between w-[90%]">
        <div>
          <Logo style="text-background" />
        </div>
        <div className="flex gap-3">
          <button className="flex px-4 p-2 gap-1 bg-background rounded-3xl items-center">
            <IoLocationOutline className="text-2xl text-red-500" />
            <div className="text-red-500">Delivery address: </div>
            <div className="text-foreground">Add Location</div>
            <IoIosArrowForward />
          </button>
          <button className="p-3 bg-secondary rounded-full">
            <CiShoppingCart className="text-xl" />
          </button>
          <button className="p-3 bg-red-500 rounded-full">
            <CiUser className="text-xl text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
