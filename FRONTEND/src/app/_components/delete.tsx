"use client";
import { useEffect, useState } from "react";
import { category } from "../page";

type Prop = {
  data: category[];
};
export const Delete = (props: Prop) => {
  const [newData, setNewData] = useState();

  const data = props.data;
  //   useEffect(() => {

  //   }, []);
  const handRequest = async (id: number) => {
    const res = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    });
    const response = await res.json();
    console.log(response);
  };
  return (
    <div className="flex-col flex">
      {data &&
        data.map((category: category, index: number) => (
          <button
            key={category._id}
            className=""
            onClick={() => {
              handRequest(category._id);
            }}
          >
            {index + 1}.{"  " + category.categoryName}
          </button>
        ))}
    </div>
  );
};
