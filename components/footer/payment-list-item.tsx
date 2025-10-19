import Image, { type StaticImageData } from "next/image";
type PaymentListItem = {
  img: StaticImageData;
  alt: string;
};

export default function PaymentListItem({ img, alt }: PaymentListItem) {
  return (
    <li className="w-[47px] h-[30px] bg-white rounded-[5px] flex justify-center items-center">
      <Image src={img} alt={alt} width={33} height={11} />
    </li>
  );
}
