import type { Metadata } from "next";
import {
  Playfair_Display,
  Bebas_Neue,
  Barlow,
  Barlow_Condensed,
} from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar       from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader   from "@/components/ui/PageLoader";
import Chatbot      from "@/components/ChatBot/ChatBot";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["700","900"], style: ["normal","italic"], display: "swap" });
const bebas    = Bebas_Neue({ subsets: ["latin"], variable: "--font-bebas", weight: "400", display: "swap" });
const barlow   = Barlow({ subsets: ["latin"], variable: "--font-barlow", weight: ["300","400","500"], display: "swap" });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], variable: "--font-barlow-condensed", weight: ["400","600","700","900"], display: "swap" });

export const metadata: Metadata = {
  title: "URO FITNESS — Built Different",
  description: "Premium fitness training in Pune. Elite coaches, world-class equipment, and transformative results.",
  keywords: ["gym","fitness","Pune","Pimpri","personal training","CrossFit","weight loss"],
  openGraph: { title: "URO FITNESS — Built Different", description: "Premium fitness training in Pune. Built Different.", type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${bebas.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <AuthProvider>
          <PageLoader />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Chatbot/>
        </AuthProvider>
        
      </body>
    </html>
  );
}
