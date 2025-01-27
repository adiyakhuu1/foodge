"use client";

import { foodOrderItems } from "@/app/OrderContext";
import { useStatusContext } from "@/app/selectStatusContext";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@clerk/nextjs";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  _id: string;
  user: string;
  food: foodOrderItems[];
  date: number;
  totalPrice: number;
  address: string;
  status: string;
  createdAt: Date;
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user.email",
    header: "Custumor",
  },
  {
    accessorKey: "foodOrderItems.length",
    header: "Food",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "user.address",
    header: "Delivery Address",
  },
  {
    // id: "select",
    accessorKey: "status",
    cell: (event) => (
      <select
        defaultValue={event.cell.row.original.status}
        className="p-2 rounded-full border text-foreground text-xs border-red-500 font-bold"
        onChange={async (e) => {
          // const { getToken } = useAuth();
          // const token = await getToken();
          console.log(e);
          const send = await fetch(
            `http://localhost:5000/foodOrder/${event.cell.row.original._id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...event.cell.row.original,
                status: e.target.value,
              }),
            }
          );
          const response = await send.json();
          console.log(event.cell.row, e.target.value);
        }}>
        <option value={`PENDING`}>PENDING</option>
        <option value={`CANCELLED`}>CANCELLED</option>
        <option value={`DELIVERED`}>DELIVERED</option>
      </select>
    ),
    // header: "Status",
    header: "Status",
  },
];
