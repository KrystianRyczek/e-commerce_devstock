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
import { Suspense } from "react";

const CheckoutPageContent = async ({ userId }: { userId: number }) => {
  const shippingMethodsArray = (await shippingMethods()) || [];
  const paymentMethodsArray = (await paymentMethods()) || [];
  const userAddressArray = (await addressesByUser(userId)) || [];
  const userOrders = (await ordersByUser(userId)) || [];

  if (userOrders.length === 0) {
    redirect("/cart");
  }
  return (
    <CheckoutForm
      userOrders={userOrders}
      userAddressArray={userAddressArray}
      shippingMethodsArray={shippingMethodsArray}
      paymentMethodsArray={paymentMethodsArray}
    />
  );
};

export default async function CheckoutPage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (!session?.user) {
    redirect(callbackUrl || "/login");
  }

  return (
    <main className="flex flex-col gap-[32px] w-full min-h-[612px] p-[40px] max-tablet:p-[8px] max-desktop:p-[20px]">
      <NavigationBar />
      <Suspense
        fallback={
          <div className="flex mx-auto my-50">
            <span className="loader"></span>
          </div>
        }
      >
        <CheckoutPageContent userId={Number(session.user.id)} />
      </Suspense>
    </main>
  );
}
