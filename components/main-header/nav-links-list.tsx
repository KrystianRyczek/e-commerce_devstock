import NavLink from "./nav-link";

type NavLinksList = {
  clickOnHamburgerMenuHandler?: () => void;
  className: string;
};
type NavLinkItem = {
  [key: string]: string;
};
export default function NavLinksList({
  clickOnHamburgerMenuHandler,
  className,
}: NavLinksList) {
  const navLinkArray: NavLinkItem[] = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/contacts", label: "Contacts" },
    { href: "/register", label: "Register" },
    { href: "/login", label: "Login" },
  ];
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
