import Card from "./card";
import { RecommendedProduct } from "@/util/types";

export default function RecomendationList({
  recommended,
}: {
  recommended: RecommendedProduct[];
}) {
  return (
    <>
      <ul className="flex w-[1628px] gap-[16px] items-center">
        {recommended.map((product) => (
          <Card key={product.id + product.name} product={product} />
        ))}
      </ul>
    </>
  );
}
