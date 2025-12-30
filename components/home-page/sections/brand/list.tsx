import Card from "./card";

type BrandsArray = { id: number; name: string; imgUrl: { url: string } | null };

export default function BrandList({ brands }: { brands: BrandsArray[] }) {
  return (
    <ul className="flex w-[1480px] gap-[30px]">
      {brands.map((brand) => (
        <Card key={brand.name} image={brand.imgUrl?.url} label={brand.name} />
      ))}
    </ul>
  );
}
