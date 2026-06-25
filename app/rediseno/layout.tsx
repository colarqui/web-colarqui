import type { Metadata } from "next";
import { Newsreader, Jost, Inter } from "next/font/google";
import "./rediseno.css";

// Display serif: Newsreader. Elegido por el carácter editorial/heritage de una
// institución con 60+ años; sus itálicas sostienen el gesto de énfasis del hero.
const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Civic/data sans: Jost. Geométrica tipo Futura/Century Gothic, alineada con la
// marca (Century Gothic / Helvetica). Da peso institucional sin la dureza de una
// grotesca condensada.
const civic = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-civic",
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
    <div className={`${display.variable} ${civic.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
