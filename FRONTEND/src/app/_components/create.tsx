"use client";

import { useEffect, useState } from "react";

export const Create = () => {
  const [name, setName] = useState<string>("");
  const [sName, setsName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [vegen, setVegan] = useState<boolean>(false);
  const [addDrinks, setDrinks] = useState<string>("");
  useEffect(() => {}, []);

  const addtofoodcat = async () => {
    const res = await fetch(`http://localhost:5000/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        category,
        vegen,
      }),
    });
    setName("");
  };
  const createModel = async () => {
    const res = await fetch(`http://localhost:5000/createModel`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: sName,
        category,
        vegan: vegen,
      }),
    });
    setsName("");
  };
  const addtodrinks = async () => {
    const res = await fetch(`http://localhost:5000/addSchemaToDrinks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: addDrinks,
      }),
    });
    setDrinks("");
  };

  return (
    <div className="flex flex-col gap-7">
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
            addtofoodcat();
          }}
        >
          Click here (schema for food-category)
        </button>
      </div>
      <div>
        <div className="flex gap-7">
          <h1>add to drinks</h1>
        </div>
        <div className="flex gap-6">
          <input
            className="schema-name text-black"
            onChange={(e) => {
              setDrinks(e.target.value);
              console.log(addDrinks);
            }}
          />
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
        <button
          onClick={() => {
            addtodrinks();
          }}
        >
          Submit
        </button>
      </div>
      <div>
        <div className="flex gap-7">
          <h1>Create model</h1>
        </div>
        <div className="flex gap-6">
          <input
            className="schema-name text-black"
            onChange={(e) => {
              setsName(e.target.value);
              console.log(sName);
            }}
          />
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
        <button
          onClick={() => {
            createModel();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
