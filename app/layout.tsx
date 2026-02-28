import type { Metadata } from "next";
import "./globals.css";
import { timesTen } from "../lib/fonts";


export const metadata: Metadata = {
  title: "Swaeta Mir",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${timesTen.className} antialiased`}>
      {children}
    </body>
    </html>
  );
}
