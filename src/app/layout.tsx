import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEAMS — Two Interactive Stories",
  description: "Two stories about the moment the world stops making sense.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
