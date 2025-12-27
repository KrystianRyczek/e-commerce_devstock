"use client";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import Close from "../svg/close";
export default function CheckoutModal({
  ref,
  children,
}: {
  ref: React.Ref<unknown>;
  children: React.ReactNode;
}) {
  const [monument, setMonument] = useState(false);
  useEffect(() => {
    setMonument(document.getElementById("modal") ? true : false);
  }, []);

  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      showModal() {
        dialog.current?.showModal();
      },
      close() {
        dialog.current?.close();
      },
    };
  });
  return (
    <dialog
      ref={dialog}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[572px] min-h-[400px] backdrop:bg-black/50  bg-modal-background border-[1px] border-modal-border p-[24px] rounded-[6px]"
    >
      <div className="relative w-full h-full flex flex-col gap-[24px]">
        <button
          type="button"
          className="absolute top-2 right-2 text-black"
          onClick={() => dialog.current?.close()}
        >
          <Close />
        </button>
        {children}
      </div>
    </dialog>
  );
}
