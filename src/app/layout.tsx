import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const robotSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IAT Cianorte - Presentation",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotSans.variable}  antialiased`}>{children}</body>
    </html>
  );
}
