import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Campos — Realtor & Remodeling",
  description: "Elevating Homes with Timeless Elegance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}