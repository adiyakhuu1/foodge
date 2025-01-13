"use client";

import { useEffect, useState } from "react";

export const Create = () => {
  const [name, setName] = useState<string>("");
  useEffect(() => {}, []);

  const handRequest = async () => {
    const res = await fetch(`http://localhost:5000/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: name,
      }),
    });
    const data = await res.json();
    setName("");
  };

  return (
    <div className="flex gap-7">
      <h1>Create</h1>
      <input
        className="text-black"
        onChange={(e) => {
          setName(e.target.value);
          console.log(name);
        }}
      />
      <button
        onClick={() => {
          handRequest();
        }}
      >
        Click here
      </button>
    </div>
  );
};
