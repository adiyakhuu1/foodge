import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

export default function DeliveryAddress() {
  return (
    <Button className="flex px-4 p-2 gap-1 bg-background rounded-3xl items-center hover:bg-secondary">
      <IoLocationOutline className="text-2xl text-red-500" />
      <div className="text-red-500">Delivery address: </div>
      <div className="text-foreground">Add Location</div>
      <IoIosArrowForward />
    </Button>
  );
}
