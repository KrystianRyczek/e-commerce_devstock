import { Metadata } from "next";
import StripePayment from "@/components/payment/stripe-payment";
import { auth } from "@/auth";
import Stripe from "stripe";
import { getTotalPriceById } from "@/util/fetching-data";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentGate = async ({
  method,
  ordersId,
  userId,
}: {
  method: string;
  ordersId: string;
  userId: number;
}) => {
  const ordersIdArray = ordersId.split("$");
  const totalPriceData = await getTotalPriceById(ordersIdArray, userId);

  // console.log("Total price data:", totalPriceData + 15 + 0.5 + 0.5);
  // // Redirect the user if they don't own the order
  // if (order.userId !== session?.user.id && session?.user.role !== "admin") {
  //   return redirect("/unauthorized");
  // }

  let client_secret = null;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalPriceData * 100),
    currency: "PLN", // Zmień z "USD" na "PLN" - BLIK wymaga PLN!
    payment_method_types: [method],
    metadata: { orderId: ordersId },
  });

  client_secret = paymentIntent.client_secret;
  return (
    <div className="flex flex-col gap-[32px] mx-auto mb-[40px] justify-center items-center max-w-[448px]">
      {client_secret !== null && (
        <StripePayment
          priceInCents={Math.round(totalPriceData * 100)}
          orderId={ordersId}
          clientSecret={client_secret}
        />
      )}
    </div>
  );
};

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{
    method: string;
    ordersId: string;
  }>;
}) {
  const { method, ordersId } = await searchParams;

  const session = await auth();

  if (!session?.user) {
    redirect(
      "/login?callbackUrl=/cart/checkout/payment?method=" +
        method +
        "&ordersId=" +
        ordersId,
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex mx-auto my-50">
          <span className="loader"></span>
        </div>
      }
    >
      <PaymentGate
        method={method}
        ordersId={ordersId}
        userId={Number(session.user.id)}
      />
    </Suspense>
  );
}
