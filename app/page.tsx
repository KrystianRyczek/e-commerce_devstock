import BrandList from "@/components/home-page/brand/list";
import RecomendationList from "@/components/home-page/sections/recomendation/list";
import CategoryList from "@/components/home-page/sections/category/list";
import Section from "@/components/home-page/sections/section";
import SlideShow from "@/components/home-page/slide-show/slide -sohow";

export default function Home() {
  return (
    <main className=" flex flex-col gap-[100px] max-desktop:gap-[50px] px-[40px] pb-[80px]">
      {/* <SlideShow /> */}
      <Section title={"Category"} href={undefined}>
        <CategoryList />
      </Section>
      <Section title={"Recomendation"} href={"/recomendation"}>
        <RecomendationList />
      </Section>
      <Section title={"Brands"} href={"/brands"}>
        <BrandList />
      </Section>
    </main>
  );
}
