import { Create } from "../_components/create";
import { Delete } from "../_components/delete";
import { Edit } from "../_components/edit";
export type category = {
  _id: number;
  name: string;
};
export default async function Home() {
  const res = await fetch(`http://localhost:5000/FoodCategory`);
  const data = await res.json();
  console.log(data);

  return (
    <div className="flex flex-col gap-8">
      <Create />

      <Delete data={data} />
    </div>
  );
}
