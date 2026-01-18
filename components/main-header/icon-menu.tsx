import Link from "next/link";
import Avatar from "./svg/avatar";
import ShoppingCart from "./svg/shopping-cart";
import Setings from "./svg/setings";
import UserAvatar from "./user-avatar";
export default function IconMenu({
  avatarUrl,
  cartItemsCount,
}: {
  avatarUrl: { avatar: string } | null;
  cartItemsCount: number;
}) {
  return (
    <div className="flex w-full h-[40px] gap-5  max-tablet:justify-between mb-5">
      <Link
        href="/cart"
        className="flex justify-center my-auto h-[24px] w-[25px]"
      >
        <div
          className={
            cartItemsCount > 0
              ? "flex relative text-logoOrange"
              : "flex text-logoNeutral"
          }
        >
          {cartItemsCount > 0 && (
            <span className="flex justify-center items-center absolute w-3 h-4 -top-2 right-1 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100">
              *
            </span>
          )}
          <ShoppingCart />
        </div>
      </Link>
      <Link
        href="/profile"
        className="flex justify-center my-auto h-[24px] w-[25px]"
      >
        {avatarUrl !== null ? (
          <UserAvatar avatarUrl={avatarUrl.avatar} />
        ) : (
          <Avatar />
        )}
      </Link>
      <Setings />
    </div>
  );
}
