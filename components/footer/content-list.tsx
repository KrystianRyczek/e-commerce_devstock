type ContentList = { contents: string[] };
export default function ContentList({ contents }: ContentList) {
  return (
    <ul className="flex flex-col gap-[16px]">
      {contents.map((item: string) => (
        <li
          className="font-medium text-base leading-[26px] text-footer-text tracking-[0%]"
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
