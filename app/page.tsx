import BrandList from "@/components/home-page/sections/brand/list";
import RecomendationList from "@/components/home-page/sections/recomendation/list";
import CategoryList from "@/components/home-page/sections/category/list";
import Section from "@/components/home-page/sections/section";
import SlideShow from "@/components/home-page/slide-show/slide -sohow";
import {
  brandsWithImages,
  categoriesWithImages,
  recommendedProducts,
} from "@/util/fetching-data";

export default async function Home() {
  const brands = await brandsWithImages;
  const categories = await categoriesWithImages;
  const recommended = await recommendedProducts.map((item) => ({
    ...item.product,
    category: item.product.category.name,
    imgUrls: item.product.imgUrls[0].url,
  }));
  return (
    <main className=" flex flex-col gap-[100px] max-desktop:gap-[50px] px-[40px] max-desktop:px-[20px] pb-[80px]">
      {/* <SlideShow /> */}
      {categories ? (
        <Section title={"Category"} href={undefined}>
          <CategoryList categories={categories} />
        </Section>
      ) : null}
      {recommended ? (
        <Section title={"Recommended Products"} href={"/products"}>
          <RecomendationList recommended={recommended} />
        </Section>
      ) : null}
      {brands ? (
        <Section title={"Brands"} href={"/brands"}>
          <BrandList brands={brands} />
        </Section>
      ) : null}
    </main>
  );
}
