import { Badge } from "@/components/ui/badge";
import { Dish, Food } from "./admin-tabs";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Card from "./admin-food-card";
import UserFoodCard from "./user-food-card";

export default async function Categories() {
  const response = await fetch(`http://localhost:5000/FoodCategory`, {
    method: "GET",
  });
  const categories: Dish[] = await response.json();
  return (
    <div className="w-full justify-items-center">
      <div className="w-[90%] flex flex-col gap-5">
        <div className="text-primary-foreground text-3xl ">Categories</div>
        <div className="flex gap-4">
          <div className="overflow-scroll w-full flex gap-7 items-center justify-center">
            <MdArrowBackIosNew className="text-background" />
            {categories.map((category: Dish) => (
              <Badge className="text-lg bg-background text-foreground hover:text-background cursor-pointer">
                {category.name}
              </Badge>
            ))}
            <MdArrowForwardIos className="text-background" />
          </div>
        </div>
      </div>
      <div className="categories w-[90%] flex flex-wrap gap-10">
        {categories.map((category) => (
          <>
            <div className="flex flex-col gap-5">
              <div className="text-3xl text-background">{category.name}</div>
              <div className="flex gap-5 flex-wrap">
                <UserFoodCard
                  categoryName={category.name}
                  categoryId={category._id}
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
