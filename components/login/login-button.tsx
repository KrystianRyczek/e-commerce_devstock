"use client";
import { useFormStatus } from "react-dom";

export default function LoginButton({
  label,
  type,
  goFowardHandler,
}: {
  label: string;
  type: "submit" | "button";
  goFowardHandler?: () => void;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-full h-[54px] rounded-[6px] bg-login-button-background text-login-button-text text-16-26-500"
      type={type}
      {...(type === "button" ? { onClick: goFowardHandler } : {})}
      disabled={pending}
    >
      <p>{pending ? "Signing In..." : label}</p>
    </button>
  );
}
