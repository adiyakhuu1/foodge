"use client";

import Image from "next/image";
import { Dish, Food } from "./admin-tabs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
type Props = {
  categoryId: string;
  categoryName: string;
};
export default function UserFoodCard({ categoryId, categoryName }: Props) {
  // add states
  const [foods, setFoods] = useState<Food[]>([]);
  const [foodName, setFoodName] = useState<string>("");
  const [ingredients, setIngre] = useState<string>("");
  const [chooseCate, setCategory] = useState<string>("");
  const [categories, setAllCategory] = useState<Dish[]>([]);

  const [price, setPrice] = useState<number>(1);
  // edit states
  const [getFoodId, setFoodId] = useState<string>("");
  const [changeCategory, setEditCategory] = useState("");

  const [ref, refresh] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const recCate = await fetch(`http://localhost:5000/food/${categoryId}`, {
        method: "GET",
      });
      const categorizedFoods: Food[] = await recCate.json();
      setFoods(categorizedFoods);
    };
    fetchData();
  }, [ref]);
  useEffect(() => {
    const fetchData = async () => {
      const recCate = await fetch(`http://localhost:5000/foodCategory`, {
        method: "GET",
      });
      const categories: Dish[] = await recCate.json();
      setAllCategory(categories);
    };
    fetchData();
  }, [ref]);
  console.log(foods);
  return (
    <>
      {foods.map((food) => (
        <div
          key={food._id}
          className="w-[270px] h-[300px] relative flex flex-col h-240px border border-border items-center gap-2 bg-background rounded-3xl"
        >
          {/* edit dialog here */}
          <Dialog>
            <DialogTrigger
              onClick={() => {
                setFoodId(food._id);
                setEditCategory(food.category);
                setFoodName(food.foodName);
                setIngre(food.ingredients);
                setPrice(food.price);
              }}
              className=""
            >
              <div>
                <GoPlus className="absolute top-[40%] bg-background right-4 text-red-500 text-xs w-10 h-10 rounded-full shadow-lg" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>soon</DialogTitle>
            </DialogContent>
          </Dialog>

          {/* here ending */}
          <Image
            className="w-[238px] h-[129px] bg-cover rounded-xl"
            src={`https://www.foodandwine.com/thmb/bT5-sIRTEMDImFAqBmEAzG5T5A4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg`}
            object-fit="cover"
            priority={false}
            width={238}
            height={129}
            alt="foodpic"
          />
          <div className="px-4 pt-2 overflow-hidden flex flex-col gap-2 w-full">
            <div>
              <div className="flex justify-between text-sm w-full">
                <h2 className="text-red-500 text-xl font-semibold">
                  {food.foodName}
                </h2>
                <div>${food.price}</div>
              </div>

              <div className="truncate text-wrap text-sm h-20">
                {food.ingredients}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
