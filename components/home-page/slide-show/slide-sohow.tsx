import Slides from "./slides";

type SlideShowParams = {
  title: string;
  category: string;
  description: string;
  imgUrl: string;
};

export default function SlideShow(slides: { slides: SlideShowParams[] }) {
  return (
    <section className="flex relative w-full h-[452px] bg-slide-show-background">
      <Slides slides={slides.slides} />
    </section>
  );
}
