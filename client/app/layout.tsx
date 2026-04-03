import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To‘quvchi qiz",
  description: "To‘qish kurslari platformasi",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
