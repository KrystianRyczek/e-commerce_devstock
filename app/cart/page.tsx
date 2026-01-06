import CartContainer from "@/components/cart/cart-container";
import EmptyCartContainer from "@/components/cart/epty-cart-container";
import NavigationBar from "@/components/cart/navigation-bar";
import { cartItemsBySessionCart, cartItemsByUser } from "@/util/fetching-data";
import { cookies } from "next/headers";

export type CartProduct = {
  id: number;
  name: string;
  color: string;
  imgUrls: { url: string };
  category: string;
  price: number;
  quantity: number;
  stock: number;
  selected: boolean;
  comment: string;
};

export default async function CartPage() {
  const cookieStore = await cookies();
  const sessionCartId = cookieStore.get("sessionCartId")?.value || "";
  const sessionCartIdItems: CartProduct[] = await cartItemsBySessionCart(
    sessionCartId
  );
  const userCartItems: CartProduct[] = []; //await cartItemsByUser(1223);
  let cartProductsArray: CartProduct[] = [];
  if (userCartItems.length === 0) {
    cartProductsArray = [...sessionCartIdItems];
  } else if (sessionCartIdItems.length === 0) {
    cartProductsArray = [...userCartItems];
  } else {
    // Merge both carts, and sum duplicate items
  }

  console.log(cartProductsArray.length);
  return (
    <main className="flex flex-col w-full min-h-[612px] text-white p-[40px] max-tablet:p-[8px] max-desktop:p-[20px]">
      <NavigationBar />
      {cartProductsArray.length > 0 ? (
        <CartContainer products={cartProductsArray} />
      ) : (
        <EmptyCartContainer />
      )}
    </main>
  );
}
