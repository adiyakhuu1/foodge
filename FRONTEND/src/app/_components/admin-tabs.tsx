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
import AdminCategory from "./admin-category-badge";
import React from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCategory from "./admin-add-category";

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
type Props = {
  page: string;
  category: string;
};
export default async function Tabs(props: Props) {
  const { page } = props;
  const categoryFromProps = props.category;
  const res = await fetch(`http://localhost:5000/FoodCategory`);
  const FoodCategory = await res.json();
  const res2 = await fetch(`http://localhost:5000/Food`, { method: "GET" });
  const Foods = await res2.json();
  let recCate, categorizedFoods: Food[];
  let oneFoodCategory = [];
  let oneF, oneC;

  if (categoryFromProps) {
    const res3 = await fetch(
      `http://localhost:5000/Food/${categoryFromProps}`,
      {
        method: "GET",
      }
    );
    oneF = await res3.json();
    oneFoodCategory.push(oneF);
    console.log(oneFoodCategory);

    const res4 = await fetch(
      `http://localhost:5000/FoodCategory/${categoryFromProps}`
    );
    oneC = await res4.json();
    console.log(oneC);
  }
  // try {
  // } catch (err) {
  //   console.error(err, "aldaa");
  // }
  // console.log(oneFoodCategory);
  // if (category !== "all") {
  //   recCate = await fetch(`http://localhost:5000/food/${category}`, {
  //     method: "GET",
  //   });

  //   const categorizedFoods: Food[] = await recCate.json();
  // }

  // const resPizza = await fetch(`http://localhost:5000/Food/${}`);
  // const response = await resPizza.json();
  // if (FoodCategory) {
  //   FoodCategory.map(async (category: Dish) => {});
  // }

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
              <Link href={`/admin?page=food menu`}>
                <Badge
                  className={`border ${
                    !categoryFromProps
                      ? `border-red-500 border`
                      : `border-border rounded-full`
                  }  py-1 px-3 font-bold text-sm bg-background text-foreground hover:text-background`}>
                  All dishes ({Foods.length})
                </Badge>
              </Link>
              {FoodCategory &&
                FoodCategory.map((category: Dish) => {
                  return (
                    <React.Fragment key={category._id}>
                      <div>
                        <AdminCategory
                          id={category._id}
                          name={category.name}
                          style={categoryFromProps}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              {/* reminder */}
              <AddCategory />
            </div>
          </div>
        </div>
        {!categoryFromProps &&
          FoodCategory.map((categor: Dish) => (
            <div
              key={categor._id}
              className="w-full h-[600px] bg-background flex flex-col gap-3 overflow-scroll scrollbar-none p-4 ">
              <div className="text-foreground text-xl font-extrabold">
                {categor.name}
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Card categoryName={categor.name} categoryId={categor._id} />
              </div>
            </div>
          ))}
        {oneC &&
          oneC.map((categor: Dish) => {
            return (
              <div
                key={categor._id}
                className="w-full h-[600px] bg-background flex flex-col gap-3 overflow-scroll p-4 ">
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
          })}
      </div>
    );
  }
}
