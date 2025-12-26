import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce - Devstock App",
  description: "E-Commerce platform",
};

export default function ProductLayout({
  sidebar,
  products,
}: Readonly<{ sidebar: React.ReactNode; products: React.ReactNode }>) {
  return (
    <div className="text-white flex max-tablet:flex-col px-[40px] max-desktop:px-[20px]">
      <section className="w-[363px] max-tablet:w-full max-desktop:w-[255px] min-tablet:min-h-[636px] min-tablet:pr-[40px]">
        {sidebar}
      </section>
      <section className="w-[calc(100%-363px)] max-desktop:w-[calc(100%-255px)] max-tablet:w-full">
        {products}
      </section>
    </div>
  );
}
