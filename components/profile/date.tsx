export default function DateParagraf({ createdAt }: { createdAt: Date }) {
  return (
    <p>
      {new Date(createdAt).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </p>
  );
}
