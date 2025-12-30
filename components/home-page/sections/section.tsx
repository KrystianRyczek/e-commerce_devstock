import Link from "next/link";
import { ReactNode } from "react";
import SeeAllArrow from "../svg/see-all-arrow";
type Section = {
  children: ReactNode;
  title: string;
  href: string | undefined;
};

export default function Section({ children, title, href }: Section) {
  return (
    <div className="w-full flex flex-col gap-6 text-section-text overflow-hidden">
      <div className="flex justify-between items-center">
        <h2 className="text-28-40-500 -tracking-[0.02rem]">{title}</h2>
        {href && (
          <Link
            className="flex text-16-26-500 gap-[16px] items-center text-section-link "
            href={href}
          >
            <span>See All</span>
            <SeeAllArrow />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
