import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "SAFFRON — An Interactive Story",
  description: "A digital reading experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${geistMono.variable} antialiased`} data-theme="yellow">
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
