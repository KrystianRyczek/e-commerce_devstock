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
    <ul className={className}>
      <li>
        <NavLink
          href="/"
          label={"Home"}
          clickOnHamburgerMenuHandler={clickOnHamburgerMenuHandler}
        />
      </li>
      <li>
        <NavLink
          href="/product"
          label={"Product"}
          clickOnHamburgerMenuHandler={clickOnHamburgerMenuHandler}
        />
      </li>
      <li>
        <NavLink
          href="/contacts"
          label={"Contacts"}
          clickOnHamburgerMenuHandler={clickOnHamburgerMenuHandler}
        />
      </li>
    </ul>
  );
}
