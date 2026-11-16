import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const GEIST_SANS = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const GEIST_MONO = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tallinn Cam Route",
  description:
    "Pick a route through Tallinn and check the traffic cameras along it for jams.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GEIST_SANS.variable} ${GEIST_MONO.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
