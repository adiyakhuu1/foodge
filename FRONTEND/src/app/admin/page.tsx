import Image from "next/image";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineTruck } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import AdminMainMenu from "../_components/admin_main_menu";
import Table from "../_components/admin_table";
import Tabs from "../_components/admin_tabs";
import TTable from "../_components/admin_table";
import { ModeToggle } from "../_components/darkmode";
import Link from "next/link";
type Props = {
  searchParams: {
    page: string;
  };
};
export default async function App(props: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await props.searchParams;
  console.log(page);
  if (!page) {
    return (
      <Link href={`?page=food menu`}>
        <div>???????</div>
      </Link>
    );
  }
  return (
    <div className="flex w-full min-h-screen bg-secondary relative">
      <div className="absolute right-10 top-10">
        <ModeToggle />
      </div>
      <AdminMainMenu page={page} />
      <div className="flex justify-center mt-20 ml-40">
        {page === `food menu` && <Tabs page={page} />}
        {page === `orders` && <Tabs page={page} />}
        {page === `settings` && <Tabs page={page} />}
      </div>
    </div>
  );
}
