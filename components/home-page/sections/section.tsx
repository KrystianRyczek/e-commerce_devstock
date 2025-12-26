import Link from "next/link";
import { ReactNode } from "react";
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
            <svg className="flex w-6 h-4" viewBox="0 0 48 33">
              <path
                className="fill-section-link stroke-0"
                d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"
              />
            </svg>
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
