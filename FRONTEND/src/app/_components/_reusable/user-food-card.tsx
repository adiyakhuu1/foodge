"use client";

import Image from "next/image";
import { Dish, Food } from "../_admin_components/admin-tabs";
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
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Pfp } from "./pfp";
type Props = {
  categoryId: string;
  categoryName: string;
};
type Order = {
  food: string;
  quantity: number;
};

export default function UserFoodCard({ categoryId, categoryName }: Props) {
  // add states
  const [foods, setFoods] = useState<Food[]>([]);
  const [foodName, setFoodName] = useState<string>("");
  const [ingredients, setIngre] = useState<string>("");
  const [chooseCate, setCategory] = useState<string>("");
  const [categories, setAllCategory] = useState<Dish[]>([]);
  const [selected, selectedFood] = useState({});

  const [price, setPrice] = useState<number>(1);
  // edit states
  const [getFoodId, setFoodId] = useState<string>("");
  const [changeCategory, setEditCategory] = useState("");
  const [count, setCount] = useState<number>(1);
  const [order, setOrder] = useState<Order[]>([]);
  const [ref, refresh] = useState(0);

  const handleSelectedFoods = () => {};
  // let order = [];
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
                setCount(1);
                console.log(order);
                // selectedFood(food);
              }}
              className=""
            >
              <div>
                <GoPlus className="absolute top-[40%] bg-background right-4 text-red-500 text-xs w-10 h-10 rounded-full shadow-lg" />
              </div>
            </DialogTrigger>
            <DialogContent className="min-w-[826px] min-h-[412px] flex items-center">
              <div className="w-2/5">
                <Image
                  src={
                    food.image
                      ? food.image
                      : `https://www.foodandwine.com/thmb/bT5-sIRTEMDImFAqBmEAzG5T5A4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg`
                  }
                  object-fit="cover"
                  priority={false}
                  width={500}
                  height={500}
                  alt="food pic"
                />
              </div>
              <div className="p-8 w-3/5 flex flex-col gap-20">
                <div className="h-24">
                  <DialogTitle className="text-red-500 text-3xl font-bold">
                    {food.foodName}
                  </DialogTitle>

                  <p className="truncate">{food.ingredients}</p>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="flex justify-between">
                    <div>
                      <div>Total price</div>
                      <div>${food.price}</div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <Button
                        disabled={count <= 1}
                        className={`bg-background border border-foreground rounded-full text-foreground hover:text-background ${
                          count <= 1 ? `cursor-not-allowed bg-muted` : ``
                        }`}
                        onClick={() => {
                          setCount((p) => p - 1);
                          console.log(count);
                        }}
                      >
                        -
                      </Button>
                      {count}
                      <Button
                        className="bg-background border border-foreground rounded-full text-foreground hover:text-background"
                        onClick={() => {
                          setCount((p) => p + 1);
                          console.log(count);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <SignedIn>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          setOrder([
                            ...order,
                            { food: food._id, quantity: count },
                          ]);
                          console.log(order);
                        }}
                        className="w-full rounded-lg bg-primary"
                      >
                        Add to cart
                      </Button>
                    </DialogClose>
                  </SignedIn>
                  <SignedOut>
                    <div className="flex items-center gap-4 justify-center">
                      <SignInButton>
                        <div>
                          <Pfp />
                          <div>Sign in</div>
                        </div>
                      </SignInButton>
                    </div>
                  </SignedOut>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* here ending */}
          <Image
            className="w-[238px] h-[129px] bg-cover rounded-xl"
            src={
              food.image
                ? food.image
                : `https://www.foodandwine.com/thmb/bT5-sIRTEMDImFAqBmEAzG5T5A4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg`
            }
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
