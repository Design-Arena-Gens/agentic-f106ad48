import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Great_Vibes, Noto_Serif, Noto_Sans_Devanagari } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const vibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-vibes" });
const notoSerif = Noto_Serif({ subsets: ["latin"], variable: "--font-noto-serif" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-devanagari" });

export const metadata: Metadata = {
  title: "Dhruva ? Prakhar | Wedding Invitation",
  description: "A cinematic, elegant animated wedding invitation for Dhruva Patel and Prakhar Patel.",
  openGraph: {
    title: "Dhruva ? Prakhar | Wedding Invitation",
    description: "Join us for a cinematic wedding experience.",
    url: "https://agentic-f106ad48.vercel.app",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  },
  themeColor: "#e0c48c"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${vibes.variable} ${notoSerif.variable} ${devanagari.variable}`}>
        {children}
      </body>
    </html>
  );
}
