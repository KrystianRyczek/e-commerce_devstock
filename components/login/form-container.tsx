export default function LoginForm({ children }: { children: React.ReactNode }) {
  return (
    <form className="flex-col w-[448px] h-[370px] p-[24px] text-login-h bg-login-background border-[1px] border-login-border rounded-[6px] flex justify-center ">
      <legend className="text-[24px] font-[600] leading-[36px] mb-[20px]">
        Sign in
      </legend>
      <hr className="w-full border-login-border mb-[32px]"></hr>
      {children}
    </form>
  );
}
