import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "To‘quvchi qiz",
  description: "To‘quv kurslari platformasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}