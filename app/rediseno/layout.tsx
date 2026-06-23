import type { Metadata } from "next";
import { Newsreader, Archivo, Inter } from "next/font/google";

// Display serif: Newsreader. Elegido por el carácter editorial/heritage de una
// institución con 60+ años; sus itálicas sostienen el gesto de énfasis del hero.
const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-redis",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Colegios Arquidiocesanos — Rediseño (exploración)",
  description:
    "Versión aislada para explorar dirección visual. 31 colegios, +29.000 estudiantes, más de 60 años de tradición.",
};

export default function RedisenoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${archivo.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
