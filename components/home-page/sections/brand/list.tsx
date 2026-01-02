import Card from "./card";
import { BrandsArray } from "@/util/types";
export default function BrandList({ brands }: { brands: BrandsArray[] }) {
  return (
    <ul className="flex w-[1480px] gap-[30px]">
      {brands.map((brand) => (
        <Card key={brand.name} image={brand.imgUrl?.url} label={brand.name} />
      ))}
    </ul>
  );
}
