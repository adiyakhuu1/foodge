import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiUser } from "react-icons/ci";

export const Pfp = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <div className="p-3 bg-red-500 rounded-full cursor-pointer">
            <CiUser className="text-xl text-primary-foreground" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="text-center">email@email.com</div>
          <div className="justify-self-center">
            <Button className="text-center">Sign out</Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
