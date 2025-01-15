import Image from "next/image";
import Link from "next/link";
import { CiSettings } from "react-icons/ci";
import { HiOutlineTruck } from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";
type Props = {
  page: string;
};
export default function AdminMainMenu(props: Props) {
  const { page } = props;
  const settingsStyle = `py-2 px-8 bg-background text-primary rounded-full flex gap-2 items-center`;
  const settingsStyleSelected = ` w-full py-2 px-8 bg-primary text-primary-foreground rounded-full flex gap-2 items-center`;
  const orderStyle = `py-2 px-8 bg-background text-primary rounded-full flex gap-2 items-center`;
  const orderStyleSelected = `w-full py-2 px-8 bg-primary text-primary-foreground rounded-full flex gap-2 items-center`;
  const foodMenuStyle = `py-2 px-8 bg-background text-primary rounded-full flex gap-2 items-center`;
  const foodMenuStyleSelected = `w-full py-2 px-8 bg-primary text-primary-foreground rounded-full flex gap-2 items-center`;
  return (
    <div className="w-[205px] min-h-screen bg-background p-5 fixed left-0 top-0">
      {/* logo here */}
      <div className="logo flex content-center p-5 gap-3">
        <div className="content-center">
          <Image alt="logo" src={`/img/logo.svg`} width={36} height={29} />
        </div>
        <div className="content-center">
          <div className="text-foreground text-lg">NomNom</div>
          <div className="text-muted-foreground text-xs">Swift devivery</div>
        </div>
      </div>
      {/* logo ending here */}
      {/* menu here */}
      <div className="justify-items-center">
        <div className="flex flex-col gap-[10px] w-full">
          <Link href={`/admin?page=food menu`}>
            <button
              className={
                page === `food menu` ? foodMenuStyleSelected : foodMenuStyle
              }
            >
              <MdOutlineDashboard />
              <h3 className="text-sm">Food menu</h3>
            </button>
          </Link>
          <Link href={`/admin?page=orders`}>
            <button
              className={page === `orders` ? orderStyleSelected : orderStyle}
            >
              <HiOutlineTruck />
              <h3 className="text-sm"> Orders</h3>
            </button>
          </Link>
          <Link href={`/admin?page=settings`}>
            <button
              className={
                page === `settings` ? settingsStyleSelected : settingsStyle
              }
            >
              <CiSettings />
              <h3 className="text-sm"> Settings</h3>
            </button>
          </Link>
        </div>
      </div>
      {/* menu ending here */}
    </div>
  );
}
