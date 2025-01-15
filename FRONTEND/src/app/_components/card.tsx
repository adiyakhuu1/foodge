"use client";

import Image from "next/image";
import { Dish, Food } from "./admin_tabs";
import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Textarea } from "@nextui-org/input";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {
  categoryId: string;
  categoryName: string;
};
export default function Card({ categoryId, categoryName }: Props) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [foodName, setFoodName] = useState<string>("");
  const [ingredients, setIngre] = useState<string>("");
  const [chooseCate, setCategory] = useState<string>("");
  const [categories, setAllCategory] = useState<Dish[]>([]);
  const [getCat, setGetCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const recCate = await fetch(`http://localhost:5000/food/${categoryId}`, {
        method: "GET",
      });
      const categorizedFoods: Food[] = await recCate.json();
      setFoods(categorizedFoods);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const recCate = await fetch(`http://localhost:5000/foodCategory`, {
        method: "GET",
      });
      const categories: Dish[] = await recCate.json();
      setAllCategory(categories);
    };
    fetchData();
  }, []);

  const addnewitem = async () => {
    const recCate = await fetch(`http://localhost:5000/food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName,
        price,
        ingredients,
        image: "",
        category: chooseCate,
      }),
    });
    const response = recCate.json();
    console.log(response);
  };
  // console.log(pizza);
  return (
    <>
      <Dialog>
        <DialogTrigger
          onClick={() => {
            setCategory(categoryId);
          }}
          className="w-[270px] h-[300px] flex flex-col h-240px border border-border border-dashed border-red-500 items-center gap-2 p-4 bg-background rounded-3xl justify-center">
          <div>
            <Image
              src={`/img/add-new-button.png`}
              alt="add-new-button"
              width={40}
              height={40}
            />
          </div>
          <div>Add new dish to {categoryName}</div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
            {/* <DialogDescription>check</DialogDescription> */}
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div>
                <h2>Food Name</h2>
                <input
                  onChange={(e) => {
                    setFoodName(e.target.value);
                  }}
                  placeholder="Enter the food name"
                  className="border  border-border rounded-md p-2"
                />
              </div>
              <div>
                <h2>Food Price</h2>
                <input
                  onChange={(e) => {
                    setPrice(Number(e.target.value));
                  }}
                  type="number"
                  placeholder="Enter the price"
                  className="border border-border rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <textarea
                onChange={(e) => {
                  setIngre(e.target.value);
                }}
                placeholder="List of ingredients"
                className="border border-border h-20"
              />
            </div>
            <div className="flex flex-col">
              <label>Food image</label>
              <input type="file" className="h-40 border border-border" />
            </div>
          </div>
          <DialogFooter>
            <Link href={`/admin?page=food order`}>
              <button
                onClick={() => {
                  addnewitem();
                }}
                type="submit"
                className="bg-foreground px-5 p-2 text-secondary">
                Save
              </button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {foods.map((food) => (
        <div
          key={food._id}
          className="w-[270px] h-[300px] relative flex flex-col h-240px border border-border items-center gap-2 p-4 bg-background rounded-3xl">
          {/* here */}
          <Dialog>
            <DialogTrigger
              onClick={() => {
                setCategory(categoryId);
              }}
              className="">
              <button>
                <Image
                  className="absolute top-1/2 right-3 border border-border rounded-full shadow-lg"
                  src={`/img/edit-button.svg`}
                  width={44}
                  height={44}
                  alt="edit button"
                />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit info - {categoryName}</DialogTitle>
                {/* <DialogDescription>check</DialogDescription> */}
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <h2>Dish Name</h2>
                    <Input
                      onChange={(e) => {
                        setFoodName(e.target.value);
                      }}
                      placeholder="Enter the food name"
                      className="border border-border rounded-md p-2 w-[288px]"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label>Select a category</label>
                    <Select>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="selec" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select a category</SelectLabel>
                          {categories.map((cate) => (
                            <SelectItem value={`${cate.name}`}>
                              <button
                                onClick={() => {
                                  setGetCategory(cate._id);
                                  console.log(getCat);
                                }}>
                                {cate.name}
                              </button>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <textarea
                      onChange={(e) => {
                        setIngre(e.target.value);
                      }}
                      placeholder="List of ingredients"
                      className="border border-border h-20"
                    />
                  </div>
                  <div className="flex justify-between ">
                    <h2>Dish Price</h2>
                    <input
                      onChange={(e) => {
                        setPrice(Number(e.target.value));
                      }}
                      type="number"
                      placeholder="Enter the price"
                      className="border border-border rounded-md p-2 w-[288px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label>Food image</label>
                  <input type="file" className="h-40 border border-border" />
                </div>
              </div>
              <DialogFooter>
                <Link href={`/admin?page=food order`}>
                  <button
                    type="submit"
                    className="bg-foreground px-5 p-2 text-secondary">
                    Save
                  </button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* here ending */}
          <Image
            className="w-[238px] h-[129px] bg-cover"
            src={`https://www.foodandwine.com/thmb/bT5-sIRTEMDImFAqBmEAzG5T5A4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg`}
            object-fit="cover"
            priority={false}
            width={238}
            height={129}
            alt="foodpic"
          />

          <div className="flex justify-between text-sm w-full">
            <h2 className="text-red-500">{food.foodName}</h2>
            <div>${food.price}</div>
          </div>

          <div className="truncate text-wrap text-sm">{food.ingredients}</div>
        </div>
      ))}
    </>
  );
}
