import BrandList from "@/components/home-page/sections/brand/list";
import RecomendationList from "@/components/home-page/sections/recomendation/list";
import CategoryList from "@/components/home-page/sections/category/list";
import Section from "@/components/home-page/sections/section";
import SlideShow from "@/components/home-page/slide-show/slide-sohow";
import {
  brandsWithImages,
  categoriesWithImages,
  recommendedProducts,
  slidesShow,
} from "@/util/fetching-data";
import { Suspense } from "react";
import MessageContainer from "@/components/home-page/message-container";

const HomePageCompotnent = async () => {
  const brands = await brandsWithImages();
  const categories = await categoriesWithImages();
  const slides = await slidesShow();
  const recommended = (await recommendedProducts()).map((item) => ({
    id: item.product.id,
    name: item.product.name,
    variantId: item.product.variants[0].id,
    price: item.product.variants[0].price,
    prevPrice: item.product.variants[0].prevPrice,
    category: item.product.category.name,
    imgUrls: item.product.imgUrls[0].url,
  }));
  return (
    <div className="flex flex-col gap-[100px] max-desktop:gap-[50px]">
      <SlideShow slides={slides} />
      {categories ? (
        <Section title={"Category"} href={undefined}>
          <CategoryList categories={categories} />
        </Section>
      ) : null}
      {recommended ? (
        <Section
          title={"Recommended Products"}
          href={"/products?sort=Recommended"}
        >
          <RecomendationList recommended={recommended} />
        </Section>
      ) : null}
      {brands ? (
        <Section title={"Brands"} href={"/products"}>
          <BrandList brands={brands} />
        </Section>
      ) : null}
    </div>
  );
};

export default async function Home(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;

  return (
    <>
      <MessageContainer callbackUrl={callbackUrl} />
      <main className=" flex flex-col px-[40px] max-desktop:px-[20px] pb-[80px]">
        <Suspense
          fallback={
            <div className="flex mx-auto my-50">
              <span className="loader"></span>
            </div>
          }
        >
          <HomePageCompotnent />
        </Suspense>
      </main>
    </>
  );
}
