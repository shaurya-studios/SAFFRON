import type { Metadata } from "next";
import { Cinzel_Decorative, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAFFRON — An Interactive Story",
  description: "Saffron is an interactive digital story following Jordan through friendship, affection, family pressure, responsibility, and the unexpected arrival of Tony.",
  openGraph: {
    title: "SAFFRON — An Interactive Story",
    description: "Saffron is an interactive digital story following Jordan through friendship, affection, family pressure, responsibility, and the unexpected arrival of Tony.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAFFRON — An Interactive Story",
    description: "Saffron is an interactive digital story following Jordan through friendship, affection, family pressure, responsibility, and the unexpected arrival of Tony.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable} antialiased`}
      >
        <svg width="0" height="0" className="hidden absolute">
          <filter id="handdrawn-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}
