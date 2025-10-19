import NavLink from "./nav-link";

type NavLinksList = {
  clickOnHamburgerMenuHandler?: () => void;
  className: string;
};
export default function NavLinksList({
  clickOnHamburgerMenuHandler,
  className,
}: NavLinksList) {
  return (
    <ul onClick={clickOnHamburgerMenuHandler} className={className}>
      <li>
        <NavLink href="/" label={"Home"} />
      </li>
      <li>
        <NavLink href="/product" label={"Product"} />
      </li>
      <li>
        <NavLink href="/contacts" label={"Contacts"} />
      </li>
    </ul>
  );
}
