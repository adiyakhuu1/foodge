import { Order, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Order[]> {
  const res = await fetch(`http://localhost:5000/foodOrder`, { method: "GET" });
  const orders = await res.json();
  console.log(orders);
  // Fetch data from your API here.
  return orders;
}

export default async function Orders() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
