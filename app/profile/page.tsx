import { auth } from "@/auth";
import NavigationBar from "@/components/profile/navigation-bar";
import ProfileContainer from "@/components/profile/profile-container";
import TransactionContainer from "@/components/profile/transaction-container";
import { ordersByUserWithProductsId } from "@/util/fetching-data";
import { redirect } from "next/navigation";

export default async function ProfilePage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (!session?.user) {
    redirect(callbackUrl || "/login");
  }

  const orders = await ordersByUserWithProductsId(Number(session.user.id));

  return (
    <main className="flex flex-col p-[40px] gap-[40px] max-desktop:p-[20px] max-desktop:gap-[20px]">
      <NavigationBar />
      <div className="flex max-tablet:flex-col w-full gap-[40px]">
        <ProfileContainer
          avatar={session.user.avatar || null}
          email={session.user.email}
        />
        <TransactionContainer orders={orders} />
      </div>
    </main>
  );
}
