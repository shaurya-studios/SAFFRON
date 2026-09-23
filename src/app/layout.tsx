import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  style: ["normal", "italic"]
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ["400", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-noto-sans-devanagari",
});

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
    <html lang="en" className={`${anton.variable} ${ibmPlexMono.variable} ${notoSansDevanagari.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
