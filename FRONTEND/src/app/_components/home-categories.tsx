"use client";
import { Badge } from "@/components/ui/badge";
import { Dish, Food } from "./admin-tabs";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import Card from "./admin-food-card";
import UserFoodCard from "./user-food-card";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Categories() {
  const [categories, setCategories] = useState<Dish[]>([]);
  const searchParams = useSearchParams();
  const categoryFromParams = searchParams.get("category");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/FoodCategory`, {
        method: "GET",
      });
      const categories: Dish[] = await response.json();
      setCategories(categories);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full justify-items-center">
      <div className="w-[90%] flex flex-col gap-5">
        <div className="text-primary-foreground text-3xl ">Categories</div>
        <div className="flex gap-4">
          <div className="overflow-scroll w-full flex gap-7 items-center justify-center scrollbar-none">
            <MdArrowBackIosNew className="text-background" />
            <div className="overflow-scroll justify-center scrollbar-none flex gap-5 w-full">
              {categories.map((category: Dish) => (
                <Link href={`/?category=${category._id}`} key={category._id}>
                  <Badge
                    className={` ${
                      categoryFromParams === category._id &&
                      `bg-red-500 text-background `
                    }`}
                  >
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>
            <MdArrowForwardIos className="text-background" />
          </div>
        </div>
      </div>
      <div className="categories w-[90%] flex flex-wrap gap-10 my-10">
        {!categoryFromParams &&
          categories.map((category) => (
            <React.Fragment key={category._id}>
              <div className="flex flex-col gap-5">
                <div className="text-3xl text-background">{category.name}</div>
                <div className="flex gap-5 flex-wrap">
                  <UserFoodCard
                    categoryName={category.name}
                    categoryId={category._id}
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        {categoryFromParams &&
          categories.map((category) => {
            if (category._id === categoryFromParams) {
              return (
                <React.Fragment key={category._id}>
                  <div className="flex flex-col gap-5">
                    <div className="text-3xl text-background">
                      {category.name}
                      <div>X</div>
                    </div>
                    <div className="flex gap-5 flex-wrap">
                      <UserFoodCard
                        categoryName={category.name}
                        categoryId={category._id}
                      />
                    </div>
                  </div>
                </React.Fragment>
              );
            }
          })}
      </div>
    </div>
  );
}
