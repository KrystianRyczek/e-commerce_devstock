import type { StaticImageData } from "next/image";
import Card from "./card";
import mouse from "@/public/category/mouse.png";
import monitor from "@/public/category/monitor.png";
import headphone from "@/public/category/headphone.png";
import keyboard from "@/public/category/keyboard.png";
import webcam from "@/public/category/camera.png";

type CategoryArray = {
  name: string;
  image: string;
};
export default function CategoryList() {
  const categoryArray: CategoryArray[] = [
    {
      name: "Mouse",
      image: "https://res.cloudinary.com/dts7qcxky/image/upload/mouse_nhm6kp",
    },
    {
      name: "Monitor",
      image: "https://res.cloudinary.com/dts7qcxky/image/upload/monitor_ac6kfg",
    },
    {
      name: "Headphone",
      image:
        "https://res.cloudinary.com/dts7qcxky/image/upload/headphone_aq7pjm",
    },
    {
      name: "Keyboard",
      image:
        "https://res.cloudinary.com/dts7qcxky/image/upload/keyboard_gqzcnr",
    },
    {
      name: "Webcam",
      image: "https://res.cloudinary.com/dts7qcxky/image/upload/camera_i6hkiw",
    },
  ];

  return (
    <ul className="flex max-tablet:flex-col w-full min-tablet:justify-between max-tablet:gap-[10px]">
      {categoryArray.map((category) => (
        <Card
          key={category.name}
          image={category.image}
          label={category.name}
        />
      ))}
    </ul>
  );
}
