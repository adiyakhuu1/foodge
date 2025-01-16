import Image from "next/image";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineTruck } from "react-icons/hi2";
import { CiSettings } from "react-icons/ci";
import AdminMainMenu from "../_components/admin-main_menu";
import Table from "../_components/admin-table";
import Tabs from "../_components/admin-tabs";
import TTable from "../_components/admin-table";
import { ModeToggle } from "../_components/darkmode";
import Link from "next/link";
type Props = {
  searchParams: {
    page: string;
    category: string;
  };
};
export default async function App(props: {
  searchParams: Promise<{ page: string; category: string }>;
}) {
  const { page } = await props.searchParams;
  const { category } = await props.searchParams;
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
        {page === `food menu` && <Tabs page={page} category={category} />}
        {page === `orders` && <Tabs page={page} category={category} />}
        {page === `settings` && <Tabs page={page} category={category} />}
      </div>
    </div>
  );
}
