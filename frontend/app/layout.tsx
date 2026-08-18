import type { Metadata } from "next";
import { Fraunces, Inter, Fragment_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fragment-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucit — Upload once. Wake up to a week posted.",
  description:
    "Lucit turns one long video into a week of posted shorts. Clipped, captioned, posted — zero editing. For solo faceless creators building toward monetization.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${fragmentMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
