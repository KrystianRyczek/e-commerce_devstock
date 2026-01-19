import { auth } from "@/auth";
import NavigationBar from "@/components/profile/navigation-bar";
import ProfileContainer from "@/components/profile/profile-container";
import TransactionContainer from "@/components/profile/transaction-container";
import { ordersByUserWithProductsId } from "@/util/fetching-data";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Transactions = async ({ userId }: { userId: number }) => {
  const orders = await ordersByUserWithProductsId(userId);
  return <TransactionContainer orders={orders} />;
};
export default async function ProfilePage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (!session?.user) {
    redirect(callbackUrl || "/login");
  }

  return (
    <main className="flex flex-col p-[40px] gap-[40px] max-desktop:p-[20px] max-desktop:gap-[20px]">
      <NavigationBar />
      <div className="flex max-tablet:flex-col w-full gap-[40px]">
        <ProfileContainer
          avatar={session.user.avatar || null}
          email={session.user.email}
        />
        <Suspense
          fallback={
            <div className="flex mx-auto my-50">
              <span className="loader"></span>
            </div>
          }
        >
          <Transactions userId={Number(session.user.id)} />
        </Suspense>
      </div>
    </main>
  );
}
