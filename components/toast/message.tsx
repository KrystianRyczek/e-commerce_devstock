import { createPortal } from "react-dom";
import SuccessIcon from "./svg/succes-icon";
import ErrorIcon from "./svg/error-icon";
import WarningIcon from "./svg/warning-icon";

export default function Message({
  type,
  style,
  message,
}: {
  type: "success" | "error" | "info";
  style: string;
  message: string;
}) {
  let portalContainer: HTMLElement | null = document.getElementById("toast");
  if (!portalContainer) {
    return null;
  }
  return createPortal(
    <div
      className={`flex w-full h-[66px] p-[18px] gap-[16px] items-center rounded-[6px] mb-[20px] border-[1px] ${style}`}
      role="alert"
    >
      <div className="flex justify-center items-center w-[23px] h-[23px]">
        {type === "success" && <SuccessIcon />}
        {type === "error" && <ErrorIcon />}
        {type === "info" && <WarningIcon />}
      </div>
      <p>{message}</p>
    </div>,
    portalContainer
  );
}
