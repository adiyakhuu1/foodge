"use client";
import { Badge } from "@/components/ui/badge";
import { Dish, Food } from "./_admin_components/admin-tabs";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { Card } from "@/components/ui/card";
import UserFoodCard from "./_reusable/user-food-card";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Section from "./_reusable/section";
import CategoryBadge from "./_reusable/category-badge";

export default function Categories() {
  const [categories, setCategories] = useState<Dish[]>([]);
  const searchParams = useSearchParams();
  const categoryFromParams: string | null = searchParams.get("category");
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
                  <CategoryBadge
                    key={category._id}
                    category={category}
                    categoryFromParams={categoryFromParams}
                  />
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
              <Section category={category} />
            </React.Fragment>
          ))}
        {categoryFromParams &&
          categories.map((category) => {
            if (category._id === categoryFromParams) {
              return (
                <React.Fragment key={category._id}>
                  <Section category={category} />
                </React.Fragment>
              );
            }
          })}
      </div>
    </div>
  );
}
