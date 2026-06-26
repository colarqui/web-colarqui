import type { Metadata } from "next";
import { Didact_Gothic } from "next/font/google";
import "./globals.css";
import "./redis-motion.css";
import { fontDisplay, fontCivic, fontBody } from "./fonts";
import ScrollToTop from "@/components/ScrollToTop";

const didactGothic = Didact_Gothic({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-didact-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Colegios Arquidiocesanos - Educación con Valores",
  description: "31 colegios formando líderes con valores cristianos en Cali. Excelencia académica desde hace más de 65 años.",
  icons: {
    icon: "/logos/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${didactGothic.variable} ${fontDisplay.variable} ${fontCivic.variable} ${fontBody.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-gold focus:text-brand-dark focus:px-4 focus:py-2 focus:rounded-xl focus:font-semibold"
        >
          Saltar al contenido principal
        </a>
        <div id="main-content">{children}</div>
        <ScrollToTop />
      </body>
    </html>
  );
}
