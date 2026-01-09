import Logo from "@/components/login/logo";
import SignInUser from "@/components/login/sign-in";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata = {
  title: "Sign In - DevStock",
  description: "Sign in to your DevStock account",
};

export default async function SignInPage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  if (session?.user) {
    redirect(callbackUrl || "/");
  }
  return (
    <main className="flex w-full h-[612px] ">
      <div className="w-[448px] flex flex-col gap-[32px] m-auto justify-center items-center">
        <Logo />
        <SignInUser />
      </div>
    </main>
  );
}
