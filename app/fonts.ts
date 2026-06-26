// Tipografías de la línea gráfica (rediseño), centralizadas para uso global.
// Display serif (Newsreader), cívica geométrica (Jost ~ Century Gothic) y una
// sans neutra (Inter) para el cuerpo del home rediseñado.
import { Newsreader, Jost, Inter } from "next/font/google";

export const fontDisplay = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const fontCivic = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-civic",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-redis",
  display: "swap",
});
