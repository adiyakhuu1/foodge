import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminMainMenu from "./admin-main_menu";
import Image from "next/image";
import Card from "./admin-food-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import AdminCard from "./admin-food-card";

const TableCard = () => {
  return (
    <TableRow className="border border-border bg-background">
      <TableCell>
        <div className="p-4">
          <input type="checkbox" />
        </div>
      </TableCell>
      <TableCell>1</TableCell>
      <TableCell>Amgalan</TableCell>
      <TableCell>2 foods</TableCell>
      <TableCell>2024/12/20</TableCell>
      <TableCell>45000</TableCell>
      <TableCell>
        <div className="truncate w-40">
          2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг+ Sbd negdsen emneleg |
          100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД
          нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд
          талд 4д ногоон20
        </div>
      </TableCell>
      <TableCell>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>State</SelectLabel>
              <SelectItem value="PENDING">PENDING</SelectItem>
              <SelectItem value="DELIVERED">DELIVERED</SelectItem>
              <SelectItem value="CANCELLED">CANCELLED</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
};
type Props = {
  page: string;
  category: string;
};
export type Dish = {
  name: string;
  _id: string;
};
export type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};
export default async function Tabs(props: Props) {
  const { page } = props;
  const { category } = props;
  const res = await fetch(`http://localhost:5000/FoodCategory`);
  const FoodCategory = await res.json();

  // const resPizza = await fetch(`http://localhost:5000/Food/${}`);
  // const response = await resPizza.json();

  if (page === `orders`) {
    return (
      <>
        <div className="min-h-screen border border-border rounded-lg ">
          <div className="top-1/2 absolute left-[55%] transform -translate-x-1/2 -translate-y-1/2 w-[70%]">
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
                  <div className="border border-border text-sm bg-muted text-foreground rounded-full py-2 px-4">
                    Change delivery state
                  </div>
                </div>
              </div>
            </div>
            <Table>
              {/* <TableCaption>The caption</TableCaption> */}
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead>
                    <div className="p-4 w-[4%]">
                      <input type="checkbox" />
                    </div>
                  </TableHead>
                  <TableHead>№</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Food</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Delivery Address</TableHead>
                  <TableHead>Delivery State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableCard />
                <TableCard />
                <TableCard />
                <TableCard />
                <TableCard />
                <TableCard />
                <TableCard />
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    );
  } else if (page === `food menu`) {
    return (
      <div className="flex flex-col gap-10 w-[70%] right-40">
        <div className="w-full ">
          <div className="w-full h-44 bg-background">
            <div className="text-xl p-5 font-bold">Dishes Category</div>
            <div className="flex gap-3 flex-wrap px-5">
              {FoodCategory &&
                FoodCategory.map((category: Dish) => (
                  <Link
                    key={category._id}
                    href={`/admin?page=food menu&category=${category._id}`}
                  >
                    <Badge className="border border-border rounded-full py-1 px-3 font-bold text-sm bg-background text-foreground hover:text-background">
                      {category.name}
                    </Badge>
                  </Link>
                ))}
            </div>
          </div>
        </div>
        {!category &&
          FoodCategory.map((categor: Dish) => (
            <div
              key={categor._id}
              className="w-full h-[600px] bg-background flex flex-col gap-3 overflow-scroll p-4 "
            >
              <div className="text-foreground text-xl font-extrabold">
                {categor.name}
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Card categoryName={categor.name} categoryId={categor._id} />
              </div>
            </div>
          ))}
        {category &&
          FoodCategory.map((categor: Dish) => {
            if (categor._id === category) {
              return (
                <div
                  key={categor._id}
                  className="w-full h-[600px] bg-background flex flex-col gap-3 overflow-scroll p-4 "
                >
                  <div className="text-foreground text-xl font-extrabold">
                    {categor.name}
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <AdminCard
                      categoryName={categor.name}
                      categoryId={categor._id}
                    />
                  </div>
                </div>
              );
            }
          })}
      </div>
    );
  }
}