export interface ColegioTheme {
  primary: string;   // hex – main accent (buttons, badges, icon highlights)
  secondary: string; // hex – decorative accent (icons, borders, tints)
}

// ── Color map by slug group ──────────────────────────────────────────
// Grouped schools share the same entry key.
const THEMES: Record<string, ColegioTheme> = {
  // I.E.O Llano Verde (all sedes) — green crest with gold accents
  "llano-verde":                  { primary: "#43A047", secondary: "#F9A825" },

  // Nelson Garcés Vernaza — blue/crimson crest
  "nelson-garces-vernaza":        { primary: "#1E88E5", secondary: "#E53935" },

  // Santa Isabel de Hungría (Alfonso López + Ciudad 2000) — burgundy/gold
  "santa-isabel":                 { primary: "#C2185B", secondary: "#F9A825" },

  // Santa Luisa de Marillac — Daughters of Charity blue / violet
  "santa-luisa-marillac":         { primary: "#1E88E5", secondary: "#7E57C2" },

  // San Joaquín (I + II) — emerald green / gold
  "san-joaquin":                  { primary: "#2E7D32", secondary: "#F9A825" },

  // Juan Pablo II — papal blue / gold
  "juan-pablo-ii":                { primary: "#1565C0", secondary: "#FFC107" },

  // San Marcos — red / gold
  "san-marcos":                   { primary: "#D32F2F", secondary: "#FFC107" },

  // Compartir — teal / warm orange
  "compartir":                    { primary: "#00897B", secondary: "#EF6C00" },

  // San Francisco Javier (Cali) — indigo / scarlet
  "san-francisco-javier":         { primary: "#3949AB", secondary: "#E53935" },

  // San Pedro Claver — navy / gold (Jesuit tradition)
  "san-pedro-claver":             { primary: "#1565C0", secondary: "#FFC107" },

  // Santiago Apóstol — royal blue / golden amber
  "santiago-apostol":             { primary: "#1A4FA0", secondary: "#E8A020" },

  // San Juan Bautista — royal blue / amber
  "san-juan-bautista":            { primary: "#1976D2", secondary: "#FF8F00" },

  // Nuestra Señora de Guadalupe — teal / rose
  "nuestra-senora-guadalupe":     { primary: "#00796B", secondary: "#E91E63" },

  // Mayor Santiago de Cali — dark navy / gold
  "mayor-santiago-cali":          { primary: "#0D47A1", secondary: "#FFB300" },

  // Instituto Comercial Arquidiocesano — indigo / orange
  "instituto-comercial":          { primary: "#303F9F", secondary: "#FF6F00" },

  // Nuestra Señora de los Andes — sky blue / forest green
  "nuestra-senora-andes":         { primary: "#0288D1", secondary: "#388E3C" },

  // San Francisco Javier Yumbo — dark teal / gold
  "san-francisco-javier-yumbo":   { primary: "#00695C", secondary: "#FFB300" },

  // Nuestra Señora del Rosario Jamundí — blue / rose
  "nuestra-senora-rosario-jamundi": { primary: "#1565C0", secondary: "#EC407A" },

  // Nuestra Señora de Chiquinquirá — blue / deep rose
  "nuestra-senora-chiquinquira":  { primary: "#1976D2", secondary: "#AD1457" },
};

// ── Slug → theme-key resolver ────────────────────────────────────────
// Maps individual slugs to their group key in THEMES.
const SLUG_TO_GROUP: Record<string, string> = {
  // Llano Verde sedes
  "llano-verde-principal":        "llano-verde",
  "llano-verde-calimio-desepaz":  "llano-verde",
  "llano-verde-calimio-norte":    "llano-verde",
  "llano-verde-invicali-desepaz": "llano-verde",
  "llano-verde-san-felipe":       "llano-verde",
  "llano-verde-san-luis":         "llano-verde",
  "llano-verde-aguacatal":        "llano-verde",
  "llano-verde-comuneros-ii":     "llano-verde",
  "llano-verde-colegio-narino":   "llano-verde",
  "llano-verde-bartolome-mitre":  "llano-verde",
  "llano-verde-la-providencia":   "llano-verde",

  // Santa Isabel de Hungría sedes
  "santa-isabel-alfonso-lopez":   "santa-isabel",
  "santa-isabel-ciudad-2000":     "santa-isabel",

  // San Joaquín sedes
  "san-joaquin":                  "san-joaquin",
  "san-joaquin-2":                "san-joaquin",
};

// Default (Arquidiocesanos brand)
const DEFAULT_THEME: ColegioTheme = {
  primary:   "#FBB823", // brand-gold
  secondary: "#EE7363", // brand-coral
};

// ── Public helpers ───────────────────────────────────────────────────

export function getColegioTheme(slug: string): ColegioTheme {
  // 1. Direct match
  if (THEMES[slug]) return THEMES[slug];
  // 2. Group match
  const group = SLUG_TO_GROUP[slug];
  if (group && THEMES[group]) return THEMES[group];
  // 3. Fallback to brand colors
  return DEFAULT_THEME;
}

/** Convert "#RRGGBB" → "R G B" for use as CSS custom property with Tailwind opacity. */
export function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** Returns "#FFFFFF" or "#12100B" depending on background luminance. */
export function contrastFg(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  // Perceived brightness (YIQ)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#12100B" : "#FFFFFF";
}
