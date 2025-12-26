type ContentList = { contents: string[] };
export default function ContentList({ contents }: ContentList) {
  return (
    <ul className="flex flex-col gap-[16px]">
      {contents.map((item: string) => (
        <li
          className="font-medium text-base text-16-26-500 text-footer-text"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
