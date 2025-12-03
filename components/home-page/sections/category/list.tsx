import type { StaticImageData } from "next/image";
import Card from "./card";
import mouse from "@/public/category/mouse.png";
import monitor from "@/public/category/monitor.png";
import headphone from "@/public/category/headphone.png";
import keyboard from "@/public/category/keyboard.png";
import webcam from "@/public/category/camera.png";

type CategoryArray = {
  name: string;
  image: StaticImageData;
};
export default function CategoryList() {
  const categoryArray: CategoryArray[] = [
    { name: "Mouse", image: mouse },
    { name: "Monitor", image: monitor },
    { name: "Headphone", image: headphone },
    { name: "Keyboard", image: keyboard },
    { name: "Webcam", image: webcam },
  ];

  return (
    // <div className="w-full flex flex-col gap-6 text-section-text">
    //   <h2>Category</h2>
    <ul className="flex max-tablet:flex-col w-full min-tablet:justify-between max-tablet:gap-[10px]">
      {categoryArray.map((category) => (
        <Card
          key={category.name}
          image={category.image}
          label={category.name}
        />
      ))}
    </ul>
    // </div>
  );
}
