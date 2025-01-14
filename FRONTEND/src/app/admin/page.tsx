import Image from "next/image";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineTruck } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import AdminMainMenu from "../_components/admin_main_menu";
import Table from "../_components/admin_table";
import TableShadcn from "../_components/admin_table_shadcn";
import TTable from "../_components/admin_table";
import { ModeToggle } from "../_components/darkmode";

export default function App() {
  return (
    <div className="flex bg-secondary relative">
      <div className="absolute right-10 top-10">
        <ModeToggle />
      </div>
      <AdminMainMenu />

      <div className="min-h-screen border border-border rounded-lg ">
        <div className="top-1/2 absolute left-[55%] transform -translate-x-1/2 -translate-y-1/2 w-[70%]">
          {/* headers */}
          <div className="h-19 flex bg-background justify-between">
            <div className="w-1/2 p-3">
              <h1>Orders</h1>
              <h4 className="text-muted-foreground">32 items</h4>
            </div>
            <div className="w-1/2">
              <div className="flex gap-4 p-3 justify-end">
                <div className="border border-border  text-sm bg-background text-foreground rounded-full py-2 px-4">
                  13 June 2023 - 14 July 2023
                </div>
                <div className="border border-border text-sm bg-foreground text-background rounded-full py-2 px-4">
                  Change delivery state
                </div>
              </div>
            </div>
          </div>
          {/* table row header */}
          {/* <div className="h-19 flex items-center justify-center border border-border">
            <div className="p-4 w-[4%]">
              <input type="checkbox" />
            </div>
            <div className="p-4 w-[4%]">№</div>
            <div className="p-4 w-[18%]">Customer</div>
            <div className="p-4 w-[13%]">Food</div>
            <div className="p-4 w-[14%]">Date</div>
            <div className="p-4 w-[13%]">Total</div>
            <div className="p-4 w-[18%]">Delivery Address</div>
            <div className="p-4 w-[13%]">Delivery State</div>
          </div> */}
          {/* tables */}
          {/* <TTable /> */}
          <TableShadcn />
        </div>
      </div>
    </div>
  );
}
