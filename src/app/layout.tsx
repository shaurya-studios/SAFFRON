import type { Metadata } from 'next';
import { Fraunces, Newsreader, Space_Grotesk } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'SAFFRON — An Interactive Story',
  description: 'An interactive book experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="\\ \ \\">
      <body className="bg-char-umbra text-ink-brown font-body antialiased overflow-hidden selection:bg-saffron-gold selection:text-char-umbra">
        {children}
      </body>
    </html>
  );
}
