import Message from "./message";

export default function MessageBox({
  type,
  msg,
}: {
  type: string;
  msg: string;
}) {
  return (
    <>
      {type === "success" && (
        <Message
          type="success"
          message={msg}
          style={
            "bg-toast-success-background text-toast-success-text border-toast-success-border"
          }
        />
      )}
      {type === "error" && (
        <Message
          type="error"
          message={msg}
          style={
            "bg-toast-error-background text-toast-error-text border-toast-error-border"
          }
        />
      )}
      {type === "info" && (
        <Message
          type="info"
          message={msg}
          style={
            "bg-toast-info-background text-toast-info-text border-toast-info-border"
          }
        />
      )}
    </>
  );
}
