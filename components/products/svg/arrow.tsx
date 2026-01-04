export default function Arrow({ styleText }: { styleText: string }) {
  return (
    <svg
      className={styleText}
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M14.0833 5.75L0.75 5.75M14.0833 5.75L9.08333 10.75M14.0833 5.75L9.08333 0.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
