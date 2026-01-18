import CheckoutForm from "@/components/checkout/checout-form";
import NavigationBar from "@/components/checkout/navigation-bar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  addressesByUser,
  ordersByUser,
  paymentMethods,
  shippingMethods,
} from "@/util/fetching-data";

export default async function CheckoutPage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (!session?.user) {
    redirect(callbackUrl || "/login");
  }
  const userId = Number(session.user.id);
  const shippingMethodsArray = (await shippingMethods()) || [];
  const paymentMethodsArray = (await paymentMethods()) || [];
  const userAddressArray = (await addressesByUser(Number(userId))) || [];
  const userOrders = (await ordersByUser(Number(userId))) || [];

  if (userOrders.length === 0) {
    redirect("/cart");
  }
  return (
    <main className="flex flex-col gap-[32px] w-full min-h-[612px] p-[40px] max-tablet:p-[8px] max-desktop:p-[20px]">
      <NavigationBar />
      <CheckoutForm
        userOrders={userOrders}
        userAddressArray={userAddressArray}
        shippingMethodsArray={shippingMethodsArray}
        paymentMethodsArray={paymentMethodsArray}
      />
    </main>
  );
}
