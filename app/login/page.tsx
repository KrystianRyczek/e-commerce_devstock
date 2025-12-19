import Logo from "@/components/login/logo";
import LoginUserName from "@/components/login/login-username";

export default function UserNamePage() {
  return (
    <main className="flex w-full h-[612px] ">
      <div className="w-[448px] flex flex-col gap-[32px] m-auto justify-center items-center">
        <Logo />
        <LoginUserName />
      </div>
    </main>
  );
}
