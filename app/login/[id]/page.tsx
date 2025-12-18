import Logo from "@/components/login/logo";
import LoginAuth from "@/components/login/login-auth";

export default function UserAuthPage() {
  return (
    <main className="flex w-full h-[612px] ">
      <div className="flex flex-col gap-[32px] m-auto justify-center items-center">
        <Logo />
        <LoginAuth />
      </div>
    </main>
  );
}
