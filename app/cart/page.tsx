import { auth } from "@/auth";
import CartContainer from "@/components/cart/cart-container";
import EmptyCartContainer from "@/components/cart/epty-cart-container";
import NavigationBar from "@/components/cart/navigation-bar";
import { cartItemsBySessionCart, cartItemsByUser } from "@/util/fetching-data";
import { cookies } from "next/headers";

export type CartProduct = {
  productId: number;
  name: string;
  color: string;
  imgUrls: { url: string };
  category: string;
  price: number;
  quantity: number;
  stock: number;
  selected: boolean;
  comment: string;
  variantId: number;
};

export default async function CartPage() {
  const user = await auth();
  const cookieStore = await cookies();
  const sessionCartId = cookieStore.get("sessionCartId")?.value || "";
  let cartProductsArray: CartProduct[] = [];
  if (user) {
    cartProductsArray = await cartItemsByUser(Number(user.user.id));
  } else {
    cartProductsArray = await cartItemsBySessionCart(sessionCartId);
  }

  return (
    <main className="flex flex-col w-full min-h-[612px] text-cart-text p-[40px] max-tablet:p-[8px] max-desktop:p-[20px]">
      <NavigationBar />
      {cartProductsArray.length > 0 ? (
        <CartContainer products={cartProductsArray} />
      ) : (
        <EmptyCartContainer />
      )}
    </main>
  );
}
