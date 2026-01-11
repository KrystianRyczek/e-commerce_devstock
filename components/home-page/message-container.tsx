"use client";
import MsgBox from "@/components/toast/message-box";
import { useEffect, useRef, useState } from "react";

export default function MessageContainer({
  callbackUrl,
}: {
  callbackUrl: string;
}) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });
  console.log("callbackUrl:", callbackUrl);
  const timer = useRef<NodeJS.Timeout | null>(null);
  if (callbackUrl === "/login") {
    setToast({
      show: true,
      message: "Login successful.",
      type: "success",
    });
  }
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
    <>{toast.show ? <MsgBox type={toast.type} msg={toast.message} /> : null}</>
  );
}
