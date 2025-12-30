import Card from "./card";
import { Category } from "@/util/types";

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <ul className="flex max-tablet:flex-col w-full min-tablet:justify-between max-tablet:gap-[10px]">
      {categories.map((category) => (
        <Card
          key={category.name}
          image={category.imgUrl?.url}
          label={category.name}
        />
      ))}
    </ul>
  );
}
