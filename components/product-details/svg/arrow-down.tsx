export default function ArrowDown() {
  return (
    <div className="absolute left-0 top-0 hidden h-full w-full peer-checked:flex">
      <svg className="flex w-[40px] h-[40px] mx-auto my-auto">
        <path
          className="fill-black scale-200"
          d="M17.418 6.109c0.272-0.268 0.709-0.268 0.979 0s0.271 0.701 0 0.969l-7.908 7.83c-0.27 0.268-0.707 0.268-0.979 0l-7.908-7.83c-0.27-0.268-0.27-0.701 0-0.969s0.709-0.268 0.979 0l7.419 7.141 7.418-7.141z"
        />
      </svg>
    </div>
  );
}
