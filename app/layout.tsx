// @ts-ignore: missing type declarations for CSS side-effect import
import "./globals.css";
import MainNavigation from "@/components/main-header/main-header";
import Footer from "@/components/footer/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce - Devstock App",
  description: "E-Commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainNavigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
