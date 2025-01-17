"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AddCategory() {
  const [name, setName] = useState<string>("");
  const path = usePathname();
  const searchParams = useSearchParams();
  const handleClick = async () => {
    const res = await fetch(`http://localhost:5000/FoodCategory/addnew`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const response = await res.json();
    console.log(response);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Image
            alt="plus"
            src={"/img/add-to-cart.svg"}
            width={25}
            height={25}
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <label>Category name</label>
          <input
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
            className="border border-border h-9 w-full"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button
              className="bg-foreground text-background flex p-3 rounded-xl"
              onClick={() => {
                handleClick();
              }}
            >
              Save Changes
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
