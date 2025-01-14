import Image from "next/image";
import { CiSettings } from "react-icons/ci";
import { HiOutlineTruck } from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";

export default function AdminMainMenu() {
  return (
    <div className="w-[12%] min-h-screen bg-background ">
      {/* logo here */}
      <div className="logo flex content-center p-7 gap-3">
        <div className="content-center">
          <Image alt="logo" src={`/img/logo.svg`} width={36} height={29} />
        </div>
        <div className="content-center">
          <div className="text-foreground">NomNom</div>
          <div className="text-muted-foreground">Swift devivery</div>
        </div>
      </div>
      {/* logo ending here */}
      {/* menu here */}
      <div className="justify-items-center">
        <div className="flex flex-col gap-[10px] w-[85%]">
          <button className="py-2 px-8 bg-primary text-primary-foreground rounded-full flex gap-2 items-center">
            <MdOutlineDashboard className="text-background" />
            <h3 className="text-sm">Food menu</h3>
          </button>
          <button className="py-2 px-8 bg-background text-primary rounded-full flex gap-2 items-center">
            <HiOutlineTruck className="text-foreground" />
            <h3 className="text-sm"> Orders</h3>
          </button>
          <button className="py-2 px-8 bg-background text-primary rounded-full flex gap-2 items-center">
            <CiSettings className="text-foreground" />
            <h3 className="text-sm"> Settings</h3>
          </button>
        </div>
      </div>
      {/* menu ending here */}
    </div>
  );
}
