import NavLink from "./nav-link";
import { navLinkArray } from "@/util/static-data";
import { NavLinksListProps } from "@/util/types";

export default function NavLinksList({
  clickOnHamburgerMenuHandler,
  className,
}: NavLinksListProps) {
  return (
    <ul className={className}>
      {navLinkArray.map((link) => (
        <li key={link.label}>
          {" "}
          <NavLink
            href={link.href}
            label={link.label}
            clickOnHamburgerMenuHandler={clickOnHamburgerMenuHandler}
          />
        </li>
      ))}
    </ul>
  );
}
