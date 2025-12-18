import Link from "next/link";

export default function LoginButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <button
        className="w-full h-[54px] rounded-[6px] bg-login-button-background text-login-button-text"
        type="button"
      >
        <p>{label}</p>
      </button>
    </Link>
  );
}
