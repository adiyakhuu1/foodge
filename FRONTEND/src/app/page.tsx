import { Create } from "./_components/create";
import { Delete } from "./_components/delete";
export type category = {
  _id: number;
  categoryName: string;
};
export default async function Home() {
  const res = await fetch(`http://localhost:5000`);
  const data = await res.json();
  console.log(data);

  return (
    <div>
      <Create />
      <Delete data={data} />
    </div>
  );
}
