import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Mystic Oracle — AI Fortune Teller",
  description: "ค้นพบสิ่งที่จักรวาลจารึกไว้สำหรับคุณ | Unlock the secrets of your destiny with AI-powered fortune readings.",
  keywords: ["fortune teller", "AI oracle", "astrology", "zodiac", "numerology", "destiny", "ดูดวง", "ทำนาย"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Mystic Oracle — AI Fortune Teller",
    description: "ดูดวงด้วย AI | Discover what the cosmos has in store for you",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="antialiased min-h-screen">
        <LanguageProvider>
          <AuthProvider>
            <StarField />
            <Header />
            <main className="relative z-10 pt-24 sm:pt-28">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
