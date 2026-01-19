import { auth } from "@/auth";
import CartForm from "@/components/cart/cart-form";
import EmptyCartContainer from "@/components/cart/epty-cart-container";
import NavigationBar from "@/components/cart/navigation-bar";
import { cartItemsBySessionCart, cartItemsByUser } from "@/util/fetching-data";
import { cookies } from "next/headers";
import { Suspense } from "react";

export type CartProduct = {
  productId: number;
  sessionCartId: string;
  name: string;
  color: string;
  imgUrls: { url: string };
  brand: string;
  category: string;
  price: number;
  quantity: number;
  stock: number;
  selected: boolean;
  comment: string;
  variantId: number;
};

const CartPageContent = async () => {
  const sesion = await auth();
  const cookieStore = await cookies();
  const sessionCartId = cookieStore.get("sessionCartId")?.value || "";
  let cartProductsArray: CartProduct[] = [];
  if (sesion) {
    cartProductsArray = await cartItemsByUser(Number(sesion.user.id));
  } else {
    cartProductsArray = await cartItemsBySessionCart(sessionCartId);
  }
  return (
    <>
      {cartProductsArray.length > 0 ? (
        <CartForm cartProducts={cartProductsArray} />
      ) : (
        <EmptyCartContainer />
      )}
    </>
  );
};

export default async function CartPage() {
  return (
    <main className="flex flex-col w-full min-h-[612px] text-cart-text p-[40px] max-tablet:p-[8px] max-desktop:p-[20px]">
      <NavigationBar />
      <Suspense
                fallback={
            <div className="flex mx-auto my-50">
              <span className="loader"></span>
            </div>
          }
          >
        <CartPageContent />
      </Suspense>
    </main>
  );
}
