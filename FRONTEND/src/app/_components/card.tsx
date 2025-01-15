import Image from "next/image";
import { Food } from "./admin_tabs";
type Props = {
  food: Food;
};
export default function Card({ food }: Props) {
  return (
    <div
      key={food._id}
      className="w-[270px] flex flex-col h-240px border border-border items-center gap-2 p-4 bg-background rounded-3xl"
    >
      <Image
        className="w-[238px] h-[129px] bg-contain"
        src={`${food.image}`}
        width={238}
        height={129}
        alt="foodpic"
      />

      <div className="flex justify-between text-sm w-full">
        <h2 className="text-red-500">Brie Crostini Appetizer</h2>
        <div>$12.99</div>
      </div>

      <div className="truncate text-wrap text-justify text-sm">
        Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
      </div>
    </div>
  );
}
