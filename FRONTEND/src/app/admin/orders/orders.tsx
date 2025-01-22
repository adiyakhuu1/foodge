import { Order, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Order[]> {
  // Fetch data from your API here.
  return [
    {
      customer: "adiyakhuu",
      food: "asdfasd",
      date: Date.now(),
      total: 12,
      address: "ajskdfasdfs",
      status: "PENDING",
    },
    {
      customer: "adiyakhuu",
      food: "asdfasd",
      date: Date.now(),
      total: 12,
      address: "ajskdfasdfs",
      status: "PENDING",
    },
    // ...
  ];
}

export default async function Orders() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
