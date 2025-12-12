import ArrowDown from "@/components/side-bar/common-components/arrow-down";

export default function FilterContainer({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 w-full border-2  bg-filter-background border-filter-border rounded-md">
      <details className="group ">
        <summary className="flex items-center justify-between gap-2 p-2 font-medium hover:cursor-pointer">
          <span className="text-filter-h">{label}</span>
          <ArrowDown />
        </summary>
        <article className="px-4 pb-4">{children}</article>
      </details>
    </div>
  );
}
