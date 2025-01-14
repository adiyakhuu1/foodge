"use client";
import { useEffect, useState } from "react";
import { category } from "../page";

type Prop = {
  data: category[];
};
export const Delete = (props: Prop) => {
  const [newData, setNewData] = useState();
  const [edit, setEdit] = useState<string>("");

  const data = props.data;
  //   useEffect(() => {

  //   }, []);
  const handRequest = async (id: number) => {
    const res = await fetch(`http://localhost:5000/FoodCategory/${id}`, {
      method: "DELETE",
    });
    const response = await res.json();
    console.log(response);
  };
  const handleRequest2 = async (id: number) => {
    const res = await fetch(
      `http://localhost:5000/FoodCategory/${id}?name=${edit}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: edit,
        }),
      }
    );
    const response = await res.json();
    console.log(response);
  };

  return (
    <div className="flex-col flex">
      <div>Food Category</div>
      {data &&
        data.map((category: category, index: number) => (
          <div className="flex gap-7" key={category._id}>
            <button
              key={category._id}
              className=" border-black"
              onClick={() => {
                handRequest(category._id);
              }}
            >
              {index + 1}.{"  " + category.name}
            </button>
            <button
              onClick={() => {
                handleRequest2(category._id);
              }}
            >
              edit
            </button>
            <input
              className="border border-border"
              onChange={(e) => {
                setEdit(e.target.value);
                console.log(edit);
              }}
            />
          </div>
        ))}
    </div>
  );
};
