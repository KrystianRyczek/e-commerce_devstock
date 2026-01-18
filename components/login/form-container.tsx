"use client";
import { logInWithCredentialsAction } from "@/util/server-action";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import MsgBox from "@/components/toast/message-box";
export default function LoginForm({
  children,
  isVisible,
  logInValueError,
  setIsVisible,
}: {
  children: React.ReactNode;
  isVisible: boolean;
  logInValueError: string;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  const timer = useRef<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  if (callbackUrl === "/register") {
    setToast({
      show: true,
      message: "Registration successful. Please log in.",
      type: "success",
    });
  }

  const [formData, action] = useActionState(logInWithCredentialsAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (formData && formData.message?.length > 0 && !formData.success) {
      setIsVisible(true);
    }
    if (!formData.success && formData.message.length > 0) {
      setToast({
        show: true,
        message: "Registration failed. ",
        type: "error",
      });
    }
  }, [formData]);

  useEffect(() => {
    if (toast.show) {
      timer.current = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [toast]);
  return (
    <>
      {toast.show ? <MsgBox type={toast.type} msg={toast.message} /> : null}
      <form
        action={action}
        className="flex-col w-full min-h-[350px] p-[24px] text-login-h bg-login-background border-[1px] border-login-border rounded-[6px] flex justify-start "
      >
        <input
          type="hidden"
          name="callback"
          id="callback"
          value={callbackUrl}
        />
        <legend className="text-[24px] font-[600] leading-[36px] mb-[20px]">
          Sign in
        </legend>
        <hr className="w-full border-login-border mb-[32px]"></hr>
        {children}
        {((formData && !formData.success && isVisible) || logInValueError) && (
          <p className="text-red-500 text-14-24-400 mt-[16px]">
            {logInValueError ? logInValueError : formData?.message}
          </p>
        )}
      </form>
    </>
  );
}
