import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getColegioBySlug, getColegios, getColegioDetalle } from "@/lib/models";
import GalleryLightbox from "@/components/GalleryLightbox";
import CostosAccordion from "@/components/CostosAccordion";
import BeneficiosDescuentos from "@/components/BeneficiosDescuentos";
import { getColegioTheme, hexToRgb, contrastFg } from "@/lib/colores-colegios";
import {
  BookOpen, GraduationCap as GradCap, Users, Music, Palette, Dumbbell, Code2,
  FlaskConical, Globe, Heart, Trophy, Microscope, Calculator, Laptop,
  Leaf, Star, Languages, Lightbulb, Church, PenTool,
} from "lucide-react";

export const dynamic = "force-dynamic";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Users as UsersIcon, 
  Calendar, 
  Clock, 
  GraduationCap, 
  ArrowLeft,
  Check,
  School,
  ExternalLink,
  Quote,
  Network,
  HandHeart,
  Video,
  Play,
  Award,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen, GraduationCap: GradCap, Users, Music, Palette, Dumbbell, Code2,
  FlaskConical, Globe, Heart, Trophy, Microscope, Calculator, Laptop,
  Leaf, Star, Languages, Lightbulb, Church, PenTool,
};

function ColIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? BookOpen;
  return <Icon className={className ?? "h-7 w-7"} />;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const colegios = await getColegios();
  return colegios.map((colegio) => ({ slug: colegio.slug }));
}

const COP = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const SLUGS_BENEFICIOS_CAL_A = [
  "santa-isabel-alfonso-lopez",
  "san-francisco-javier",
  "san-joaquin",
  "san-joaquin-2",
];

export default async function ColegioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [colegio, detalle] = await Promise.all([
    getColegioBySlug(slug),
    getColegioDetalle(slug),
  ]);

  if (!colegio) notFound();

  const theme = getColegioTheme(slug);
  const cssVars = {
    "--col-primary":    hexToRgb(theme.primary),
    "--col-primary-fg": hexToRgb(contrastFg(theme.primary)),
    "--col-secondary":  hexToRgb(theme.secondary),
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col bg-white" style={cssVars}>
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-brand-dark via-brand-dark to-[#1a1610] text-white py-20">
          {(() => {
            const HERO_FONDO_FALLBACK: Record<string, string> = {
              "nuestra-senora-guadalupe":  "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/02/20260120_105948-1.webp",
              "nuestra-senora-chiquinquira": "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/03/20260316_102703-scaled.webp",
              "san-juan-bautista":        "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/03/20260316_102152-scaled.webp",
              "santa-isabel-ciudad-2000": "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/03/BANNER-C2000.webp",
            };
            const fondoUrl = detalle.heroFondo || HERO_FONDO_FALLBACK[slug] || "";
            const overlayPct = detalle.heroFondo ? detalle.heroOverlay : (HERO_FONDO_FALLBACK[slug] ? 80 : 0);
            const overlayColor = detalle.heroFondo ? (detalle.heroOverlayColor || "#000000") : "#000000";
            if (!fondoUrl) return null;
            return (
              <>
                <img src={fondoUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: overlayColor, opacity: overlayPct / 100 }} />
              </>
            );
          })()}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/colegios"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-colegio-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a colegios
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-colegio-primary text-colegio-primary-fg text-sm font-bold rounded-full">
                    Calendario {colegio.calendario}
                  </span>
                  <span className="px-3 py-1 bg-white text-brand-dark text-sm font-bold rounded-full flex items-center gap-1 shadow-sm">
                    <MapPin className="h-3 w-3 text-colegio-secondary" />
                    {colegio.zona}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {colegio.nombre}
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {colegio.descripcion}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={slug === "nuestra-senora-guadalupe" ? "https://nsg.runacode.com/public/preinscripcionesweb" : "https://runachay.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-colegio-primary text-colegio-primary-fg px-6 py-3 rounded-xl font-bold hover:bg-colegio-primary/90 transition-colors"
                  >
                    Inscribirme aquí
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors">
                    <Phone className="h-4 w-4" />
                    Contactar
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="h-[28rem] md:h-[32rem] lg:h-[36rem] w-full bg-gradient-to-br from-colegio-primary/20 to-colegio-secondary/20 rounded-3xl flex items-center justify-center p-8 overflow-hidden">
                  {(() => {
                    const HERO_CONTENEDOR_FALLBACK: Record<string, string> = {
                      "nuestra-senora-guadalupe":    "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/02/20260120_093703-1.webp",
                      "nuestra-senora-chiquinquira": "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/03/20260316_102703-scaled.webp",
                      "san-juan-bautista":           "/images/hero1-sjbautista.jpg",
                      "santa-isabel-ciudad-2000":    "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/03/primero-c2000-1.webp",
                    };
                    const contenedorUrl = detalle.heroContenedor || HERO_CONTENEDOR_FALLBACK[slug] || "";
                    if (contenedorUrl) return (
                      <img src={contenedorUrl} alt={colegio.nombre} className="w-full h-full object-cover rounded-2xl" />
                    );
                    if (colegio.logo) return (
                      <img src={colegio.logo} alt={`Logo ${colegio.nombre}`} className="max-h-40 max-w-40 w-auto h-auto object-contain drop-shadow-xl" />
                    );
                    return <School className="h-32 w-32 text-colegio-primary/30" />;
                  })()}
                </div>
                <div className="absolute -bottom-4 right-4 md:-right-4 bg-white text-brand-dark p-6 rounded-2xl shadow-xl">
                  {colegio.logo ? (
                    <img
                      src={colegio.logo}
                      alt={`Escudo ${colegio.nombre}`}
                      className="h-24 w-auto object-contain"
                    />
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-colegio-secondary">{colegio.estudiantes.toLocaleString("es-CO")}</div>
                      <div className="text-sm text-gray-600">Estudiantes</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-colegio-primary" />
                  <span className="text-2xl font-bold text-brand-dark">{colegio.fundacion}</span>
                </div>
                <div className="text-base font-medium text-gray-700">Fundación</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-colegio-secondary" />
                  <span className="text-2xl font-bold text-brand-dark">{(colegio.egresados ?? 0).toLocaleString("es-CO")}</span>
                </div>
                <div className="text-base font-medium text-gray-700">Egresados</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <UsersIcon className="h-5 w-5 text-colegio-primary" />
                  <span className="text-2xl font-bold text-brand-dark">{colegio.estudiantes.toLocaleString("es-CO")}</span>
                </div>
                <div className="text-base font-medium text-gray-700">Estudiantes activos</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-colegio-secondary" />
                  <span className="text-2xl font-bold text-brand-dark">{colegio.niveles.length}</span>
                </div>
                <div className="text-base font-medium text-gray-700">Niveles</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NIVELES EDUCATIVOS ── */}
        {colegio.niveles.length > 0 && (
          <section className="py-10 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-brand-dark">Niveles Educativos</h2>
                <p className="text-gray-500 mt-1">Oferta educativa por etapas de formación</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {colegio.niveles.map((nivel) => (
                  <div
                    key={nivel}
                    className="flex items-center gap-2 bg-colegio-primary/10 text-colegio-primary px-5 py-3 rounded-xl font-semibold text-sm"
                  >
                    <School className="h-4 w-4" />
                    {nivel}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── OFERTA ACADÉMICA ── */}
        {detalle.ofertaItems.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">{detalle.ofertaTitulo}</h2>
                {detalle.ofertaCopy && <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">{detalle.ofertaCopy}</p>}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {detalle.ofertaItems.map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-colegio-primary/10 rounded-xl flex items-center justify-center mb-4 text-colegio-primary">
                      <ColIcon name={item.icono} />
                    </div>
                    <h3 className="font-bold text-brand-dark text-lg mb-2">{item.titulo}</h3>
                    {item.descripcion && <p className="text-base text-gray-600 leading-relaxed">{item.descripcion}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── GALERÍA ── */}
        {detalle.galeria.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Galería</h2>
              </div>
              <GalleryLightbox items={detalle.galeria} colegioNombre={colegio.nombre} />
            </div>
          </section>
        )}

        {/* ── EQUIPO DIRECTIVO ── */}
        {detalle.equipo.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Conoce a nuestro Equipo</h2>
                <p className="text-gray-600">El equipo directivo comprometido con tu formación</p>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {detalle.equipo.map((m, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6 text-center w-60">
                    <div className="w-[124px] h-[124px] mx-auto mb-4 rounded-full overflow-hidden bg-colegio-primary/10 flex items-center justify-center">
                      {m.foto ? (
                        <img src={m.foto} alt={m.nombre} className="w-full h-full object-cover object-top scale-110" />
                      ) : (
                        <UsersIcon className="h-10 w-10 text-colegio-primary" />
                      )}
                    </div>
                    <div className="font-bold text-brand-dark text-base">{m.nombre}</div>
                    <div className="text-sm text-gray-600 mt-1 font-medium">{m.cargo}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── TESTIMONIOS ── */}
        {detalle.testimonios.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Voces de nuestra comunidad</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detalle.testimonios.map((t, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6">
                    <Quote className="h-8 w-8 text-colegio-primary mb-4" />
                    <p className="text-gray-700 italic leading-relaxed mb-6">&ldquo;{t.texto}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-colegio-secondary/10 flex items-center justify-center flex-shrink-0">
                        {t.foto ? (
                          <img src={t.foto} alt={t.nombre} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-colegio-secondary font-bold text-sm">{t.nombre.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-brand-dark text-base">{t.nombre}</div>
                        <div className="text-sm text-gray-600">{t.relacion}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── TESTIMONIOS EN VIDEO ── */}
        {detalle.testimoniosVideo.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Testimonios en video</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Conoce de primera mano las experiencias de nuestra comunidad.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {detalle.testimoniosVideo.map((v, i) => {
                  const ytEmbed = v.tipo === "url" ? getYouTubeEmbedUrl(v.url) : null;
                  return (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-gray-900 relative">
                        {ytEmbed ? (
                          <iframe
                            src={ytEmbed}
                            title={v.titulo || `Video ${i + 1}`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : v.tipo === "local" || v.url.match(/\.(mp4|webm|ogg)(\?.*)?$/i) ? (
                          <video
                            src={v.url}
                            controls
                            className="w-full h-full"
                            poster={v.thumbnail || undefined}
                          />
                        ) : (
                          <a
                            href={v.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex flex-col items-center justify-center text-white bg-brand-dark/80 hover:bg-brand-dark/90 transition-colors"
                          >
                            <Play className="h-12 w-12 mb-2" />
                            <span className="text-sm font-medium">Ver video externo</span>
                          </a>
                        )}
                      </div>
                      <div className="p-5">
                        {v.titulo && <h3 className="font-bold text-brand-dark text-lg mb-1">{v.titulo}</h3>}
                        {v.autor && <p className="text-sm text-gray-600">{v.autor}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── POR QUÉ ELEGIRNOS ── */}
        <section className="py-16 bg-brand-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h2>
              <p className="text-gray-300 max-w-xl mx-auto">Tres razones que nos hacen únicos</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  Icon: Network,
                  titulo: "Red de Colegios",
                  desc: "Hacemos parte de una red de 31 colegios arquidiocesanos alrededor de Cali, Yumbo y Jamundí.",
                },
                {
                  Icon: HandHeart,
                  titulo: "Somos Comunidad",
                  desc: "Somos una familia de más de 29.000 estudiantes creciendo juntos en valores, fe y excelencia.",
                },
                {
                  Icon: GraduationCap,
                  titulo: "Acompañamiento Cercano",
                  desc: "Desde Preescolar hasta Grado 11°, con un impacto integral en lo académico, emocional y espiritual.",
                },
              ].map(({ Icon, titulo, desc }, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 bg-colegio-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-7 w-7 text-colegio-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{titulo}</h3>
                  <p className="text-gray-300 leading-relaxed text-base">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFICIOS Y DESCUENTOS ── */}
        {(colegio.calendario === "B" || SLUGS_BENEFICIOS_CAL_A.includes(slug)) && (
          <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <BeneficiosDescuentos />
            </div>
          </section>
        )}

        {/* ── COSTOS EDUCATIVOS ── */}
        {(colegio.calendario === "B" || SLUGS_BENEFICIOS_CAL_A.includes(slug)) && detalle.costos.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Costos Educativos</h2>
                <p className="text-gray-600 leading-relaxed">Valores vigentes para el año escolar en curso. Haz clic en cada grado para ver los detalles.</p>
              </div>
              <CostosAccordion costos={detalle.costos} />
              <p className="text-sm text-gray-500 text-center mt-4">* Los valores pueden variar. Contáctanos para información actualizada.</p>
            </div>
          </section>
        )}

        {/* ── CONTACTO / CTA ── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 min-w-0">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 min-w-0">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Información de Contacto</h3>
                <ul className="space-y-4 min-w-0">
                  <li className="flex items-start gap-3 min-w-0">
                    <MapPin className="h-5 w-5 text-colegio-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 break-words min-w-0">{colegio.direccion}</span>
                  </li>
                  <li className="flex items-center gap-3 min-w-0">
                    <Phone className="h-5 w-5 text-colegio-secondary flex-shrink-0" />
                    <span className="text-gray-700 break-words min-w-0">{colegio.telefono}</span>
                  </li>
                  <li className="flex items-center gap-3 min-w-0">
                    <Mail className="h-5 w-5 text-colegio-secondary flex-shrink-0" />
                    <a href={`mailto:${colegio.email}`} className="text-gray-700 break-words min-w-0 hover:text-colegio-secondary transition-colors">
                      {colegio.email}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="bg-brand-dark p-6 rounded-2xl text-center flex flex-col justify-center min-w-0">
                <h3 className="text-lg font-bold text-white mb-2">¿Interesado?</h3>
                <p className="text-gray-300 text-base mb-4">Inicia el proceso de admisión para ser parte de nuestra familia.</p>
                <a
                  href={slug === "nuestra-senora-guadalupe" ? "https://nsg.runacode.com/public/preinscripcionesweb" : "https://runachay.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-colegio-primary text-colegio-primary-fg py-3 rounded-xl font-bold hover:bg-colegio-primary/90 transition-colors break-words"
                >
                  Inscribirme ahora
                  <ExternalLink className="inline h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
