import Logo from "@/components/register/logo";
import RegistrationForm from "@/components/register/registration-form";

export default function RegisterPage() {
  return (
    <main className="flex w-full min-h-[612px] ">
      <div className="flex flex-col gap-[32px] m-auto justify-center items-center max-w-[448px] min-h-[1018px]">
        <Logo />
        <RegistrationForm />
      </div>
    </main>
  );
}
