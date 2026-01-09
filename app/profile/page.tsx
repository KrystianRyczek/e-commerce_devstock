import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (!session?.user) {
    redirect(callbackUrl || "/login");
  }
  return <main>Profile Page</main>;
}
