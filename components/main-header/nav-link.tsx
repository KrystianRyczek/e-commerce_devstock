"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
type NavLink = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: NavLink) {
  const path = usePathname();
  return (
    <Link
      className={
        label.toLowerCase() !== "home"
          ? path.startsWith(href)
            ? "active"
            : "link"
          : path === href
          ? "active"
          : "link"
      }
      href={href}
    >
      {label}
    </Link>
  );
}
