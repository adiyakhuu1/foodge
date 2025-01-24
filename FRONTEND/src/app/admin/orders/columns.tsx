"use client";

import { foodOrderItems } from "@/app/OrderContext";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  user: string;
  food: foodOrderItems[];
  date: number;
  totalPrice: number;
  address: string;
  status: "PENDING" | "CANCELED" | "DELIVERED";
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
    accessorKey: "address",
    header: "Delivery Address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
