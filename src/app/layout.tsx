import type { Metadata } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

// Hebrew fonts
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ד״ר רימה לאופר | רפואת עור והשתלות שיער",
  description: "מרפאה מקצועית להשתלות שיער, טיפולי שיער ורפואת עור בתל אביב",
  keywords: ["השתלת שיער", "רפואת עור", "דרמטולוגיה", "PRP", "מזותרפיה"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${assistant.variable}`}>
      <body className="min-h-screen bg-white font-heebo antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
