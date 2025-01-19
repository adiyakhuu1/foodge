"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Create = () => {
  const [name, setName] = useState<string>("");
  const [sName, setsName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [vegen, setVegan] = useState<boolean>(false);
  const [addDrinks, setDrinks] = useState<string>("");

  const addtofoodcat = async () => {
    await fetch(`http://localhost:5000/FoodCategory/addnew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    // setName("");
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex gap-7">
        <h1>Create</h1>
        <input
          className="text-black border border-border"
          onChange={(e) => {
            setName(e.target.value);
            console.log(name);
          }}
        />
        <Button
          onClick={() => {
            addtofoodcat();
          }}
        >
          Click here (schema for food-category)
        </Button>
      </div>
      <div>
        <div className="flex gap-7">
          {/* <input
            className="text-black"
            onChange={(e) => {
              setCategory(e.target.value);
              console.log(category);
            }}
          />
          <select
            onChange={(e) => {
              setVegan(Boolean(e.target.value));
              console.log(vegen, typeof vegen);
            }}
            className="text-black"
          >
            <option>false</option>
            <option>true</option>
          </select> */}
        </div>
      </div>
      <div>
        {/* <input
            className="text-black"
            onChange={(e) => {
              setCategory(e.target.value);
              console.log(category);
            }}
          />
          <select
            onChange={(e) => {
              setVegan(Boolean(e.target.value));
              console.log(vegen, typeof vegen);
            }}
            className="text-black"
          >
            <option>false</option>
            <option>true</option>
          </select> */}
      </div>
    </div>
  );
};
