import SuccessContainer from "@/components/success/success-container";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { orderStatusChangeAction } from "@/util/server-action";
import { ordersByIds } from "@/util/fetching-data";

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{
    payment: string;
  }>;
  searchParams: Promise<{
    payment_intent: string;
    redirect_status: string;
  }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const { redirect_status, payment_intent } = await searchParams;
  const currentParams = await params;
  const ordersId = currentParams.payment.split("%24").map((id) => +id);

  if (!payment_intent) {
    redirect("/cart");
  }
  await orderStatusChangeAction(ordersId);
  const ordersArray = await ordersByIds(ordersId);
  return (
    <main className="flex flex-col gap-[32px] w-full min-h-[612px] p-[40px] max-tablet:p-[8px] max-desktop:p-[20px] text-white">
      {redirect_status === "succeeded" && (
        <SuccessContainer orders={ordersArray} />
      )}
      {redirect_status !== "succeeded" && (
        <div className="flex flex-col gap-[24px] mx-auto justify-center items-center">
          <h1 className="flex mx-auto text-28-40-500 -tracking-[0.02em]  text-payment-h">
            Payment failed. Please try again later...
          </h1>
        </div>
      )}
    </main>
  );
}
