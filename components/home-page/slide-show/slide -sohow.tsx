import mouse from "@/public/slide-show/mouse-img.png";
import Slide from "./slide";
const SlidesArray = [
  {
    category: "Mouse",
    description:
      "Explore our diverse selection of electronic mice for sale, featuring cutting-edge technology, ergonomic designs, and unbeatable prices. Shop now!",
    image: mouse,
  },
  {
    category: "Monitor",
    description:
      "Explore our diverse selection of electronic mice for sale, featuring cutting-edge technology, ergonomic designs, and unbeatable prices. Shop now!",
    image: mouse,
  },
  {
    category: "Headphone",
    description:
      "Explore our diverse selection of electronic mice for sale, featuring cutting-edge technology, ergonomic designs, and unbeatable prices. Shop now!",
    image: mouse,
  },
  {
    category: "Keyboard",
    description:
      "Explore our diverse selection of electronic mice for sale, featuring cutting-edge technology, ergonomic designs, and unbeatable prices. Shop now!",
    image: mouse,
  },
  {
    category: "Webcam",
    description:
      "Explore our diverse selection of electronic mice for sale, featuring cutting-edge technology, ergonomic designs, and unbeatable prices. Shop now!",
    image: mouse,
  },
];
export default function SlideShow() {
  return (
    <section className="w-full h-[452px] bg-slide-show-backgroud">
      <Slide
        category={SlidesArray[0].category}
        description={SlidesArray[0].description}
        image={SlidesArray[0].image}
      />
    </section>
  );
}
