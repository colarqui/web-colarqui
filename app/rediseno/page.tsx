import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  MapPin,
  HeartHandshake,
  Sprout,
  GraduationCap,
  BookOpen,
  Users,
} from "lucide-react";
import RedDeColegios from "./RedDeColegios";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

export const dynamic = "force-static";

const destacados = [
  {
    nombre: "San Francisco Javier",
    zona: "Cali · Suroriente",
    logo: "/logos/san-francisco-javier-cali.png",
    calendario: "B",
  },
  {
    nombre: "Nuestra Señora de Chiquinquirá",
    zona: "Cali · Oriente",
    logo: "/logos/nuestra-senora-chiquinquira.png",
    calendario: "A",
  },
  {
    nombre: "Nuestra Señora de Guadalupe",
    zona: "Cali · Ladera",
    logo: "/logos/nuestra-senora-guadalupe.png",
    calendario: "B",
  },
];

const niveles = [
  { rango: "Jardín · Transición", nombre: "Preescolar", edad: "3 a 5 años", icon: Sprout },
  { rango: "1.° a 5.°", nombre: "Básica Primaria", edad: "6 a 10 años", icon: BookOpen },
  { rango: "6.° a 9.°", nombre: "Básica Secundaria", edad: "11 a 14 años", icon: Users },
  { rango: "10.° y 11.°", nombre: "Educación Media", edad: "15 a 17 años", icon: GraduationCap },
];

export default function RedisenoHome() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF6EE] font-[var(--font-inter-redis)]">
      <Header />

      <main className="flex-grow">
        {/* ===================== HERO CÁLIDO ===================== */}
        <section className="bg-[#FBF6EE] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Texto */}
              <div>
                <div className="inline-flex items-center gap-3 mb-7">
                  <span className="h-px w-8 bg-brand-coral" />
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#c0533f] font-[var(--font-inter-redis)]">
                    Una familia de 31 colegios · desde 1960
                  </span>
                </div>

                <h1
                  className="text-[2.6rem] sm:text-5xl lg:text-[3.6rem] leading-[1.04] text-brand-dark tracking-tight"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  Donde tu hijo crece{" "}
                  <span className="italic text-brand-coral">acompañado</span>, no solo educado.
                </h1>

                <p className="mt-6 text-lg text-[#6a6358] max-w-xl leading-relaxed">
                  Más de 60 años formando niños y jóvenes en Cali con cercanía, valores y
                  excelencia académica. Desde preescolar hasta 11.°, siempre cerca de tu casa.
                </p>

                <div className="mt-9 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/colegios"
                    className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white px-7 py-4 rounded-full font-semibold hover:bg-[#1f1b14] active:scale-[0.98] transition-all"
                  >
                    Encuentra tu colegio
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#la-red"
                    className="inline-flex items-center justify-center gap-2 bg-white text-brand-dark border border-[#e4dccf] px-7 py-4 rounded-full font-semibold hover:bg-[#f3ead9] active:scale-[0.98] transition-all"
                  >
                    Conoce la red
                  </a>
                </div>
              </div>

              {/* Collage de fotos */}
              <div className="relative h-[340px] sm:h-[400px]">
                <div
                  className="absolute top-0 right-0 w-[74%] h-[68%] rounded-[24px] bg-brand-coral bg-cover bg-center shadow-xl"
                  style={{ backgroundImage: "url('/images/estudiantes-hero.jpg')" }}
                />
                <div
                  className="absolute bottom-0 left-0 w-[56%] h-[52%] rounded-[20px] bg-brand-dark bg-cover bg-center border-[6px] border-[#FBF6EE] shadow-lg"
                  style={{ backgroundImage: "url('/images/estudiantes-cta-admisiones.jpg')" }}
                />
                <div className="absolute top-5 left-2 bg-white rounded-2xl px-5 py-3 shadow-[0_10px_30px_rgba(18,16,11,0.12)]">
                  <div
                    className="text-3xl text-brand-dark leading-none"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                  >
                    29.000+
                  </div>
                  <div className="text-xs text-[#8a8275] font-medium mt-1">estudiantes hoy</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== FRANJA DE VALOR ===================== */}
        <section className="bg-white border-y border-[#efe6d7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: HeartHandshake,
                tint: "bg-[#fdf0d4] text-[#c79214]",
                title: "Acompañamiento cercano",
                desc: "Pastoral educativa y tutoría que conocen a cada niño por su nombre.",
              },
              {
                icon: MapPin,
                tint: "bg-[#fae4df] text-[#c0533f]",
                title: "Siempre cerca de ti",
                desc: "31 sedes distribuidas en Cali y los municipios de Yumbo y Jamundí.",
              },
              {
                icon: GraduationCap,
                tint: "bg-[#fdf0d4] text-[#c79214]",
                title: "60 años de tradición",
                desc: "Generaciones de caleños que ya se formaron en nuestras aulas.",
              },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 90} className="flex gap-4 items-start">
                <div className={`w-12 h-12 rounded-2xl flex-none flex items-center justify-center ${v.tint}`}>
                  <v.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3
                    className="text-lg text-brand-dark"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-[#7a7367] text-sm leading-relaxed mt-1">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===================== LA RED (SECCIÓN CÍVICA — FIRMA) ===================== */}
        <section id="la-red" className="bg-brand-dark text-white relative overflow-hidden scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <span
                  className="text-[11px] tracking-[0.2em] uppercase text-brand-gold"
                  style={{ fontFamily: "var(--font-archivo)", fontWeight: 700 }}
                >
                  La Red · Valle del Cauca
                </span>
                <h2
                  className="mt-4 text-4xl md:text-5xl uppercase leading-[0.98] tracking-tight"
                  style={{ fontFamily: "var(--font-archivo)", fontWeight: 800 }}
                >
                  Una sola red.
                  <br />
                  <span className="text-brand-gold">Toda la ciudad</span> cubierta.
                </h2>
                <p className="mt-5 text-[#a9a194] max-w-md leading-relaxed">
                  No somos un colegio: somos una red arquidiocesana de 31 instituciones que
                  comparten el mismo proyecto educativo. Donde quiera que vivas en Cali, hay una
                  sede cerca de tu hogar.
                </p>

                {/* Registro de cifras */}
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 border-t border-[#2a261f]">
                  {[
                    { end: 31, suffix: "", l: "colegios", c: "text-white" },
                    { end: 29, suffix: "K+", l: "estudiantes", c: "text-brand-gold" },
                    { end: 60, suffix: "+", l: "años", c: "text-white" },
                    { end: 3, suffix: "", l: "municipios", c: "text-brand-coral" },
                  ].map((s, i) => (
                    <div key={i} className="py-5 pr-4 border-r border-[#2a261f] last:border-r-0">
                      <CountUp
                        end={s.end}
                        suffix={s.suffix}
                        className={`block text-3xl leading-none font-[var(--font-archivo)] font-extrabold ${s.c}`}
                      />
                      <div className="text-[11px] text-[#8a8275] font-medium mt-2">{s.l}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/colegios"
                  className="mt-9 inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-7 py-4 rounded-md font-semibold hover:bg-[#ffc94d] transition-colors"
                >
                  Ver el mapa completo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <Reveal delay={120}>
                <RedDeColegios />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===================== NIVELES ===================== */}
        <section className="bg-[#FBF6EE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl mb-12">
              <h2
                className="text-3xl md:text-4xl text-brand-dark leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                De los primeros pasos al grado 11.°
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {niveles.map((n, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="group h-full bg-white rounded-2xl p-6 border border-[#efe6d7] hover:border-brand-coral/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-[#fae4df] text-brand-coral flex items-center justify-center mb-5 group-hover:bg-brand-coral group-hover:text-white transition-colors">
                      <n.icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-semibold tracking-wide text-[#b06b5e] uppercase">
                      {n.rango}
                    </div>
                    <h3
                      className="mt-1 text-xl text-brand-dark"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                    >
                      {n.nombre}
                    </h3>
                    <p className="text-sm text-[#8a8275] mt-1">{n.edad}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== COLEGIOS DESTACADOS ===================== */}
        <section className="bg-white border-t border-[#efe6d7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <h2
                className="text-3xl md:text-4xl text-brand-dark leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Conoce algunos de
                <br className="hidden sm:block" /> nuestros colegios
              </h2>
              <Link
                href="/colegios"
                className="inline-flex items-center gap-2 text-brand-dark font-semibold hover:text-brand-coral transition-colors"
              >
                Ver los 31 colegios
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-7">
              {destacados.map((c, i) => (
                <Reveal key={i} delay={i * 90}>
                  <Link
                    href="/colegios"
                    className="group block h-full bg-[#FBF6EE] rounded-2xl overflow-hidden border border-[#efe6d7] hover:shadow-xl hover:shadow-brand-dark/5 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-44 bg-brand-dark flex items-center justify-center p-6 overflow-hidden">
                      <img
                        src={c.logo}
                        alt={`Logo ${c.nombre}`}
                        className="max-h-28 w-auto object-contain drop-shadow group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 right-4 px-3 py-1 bg-brand-gold text-brand-dark text-xs font-bold rounded-full">
                        Calendario {c.calendario}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3
                        className="text-lg text-brand-dark group-hover:text-brand-coral transition-colors"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                      >
                        {c.nombre}
                      </h3>
                      <div className="flex items-center gap-2 text-[#8a8275] text-sm mt-2">
                        <MapPin className="h-4 w-4" />
                        {c.zona}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CTA FINAL ===================== */}
        <section className="bg-brand-coral">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2
              className="text-3xl md:text-5xl text-white leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              El primer paso es conocernos
            </h2>
            <p className="mt-5 text-white/85 text-lg max-w-xl mx-auto">
              Agenda una visita o consulta el proceso de admisión. Con gusto te recibimos en la
              sede más cercana a tu casa.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/admisiones"
                className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1f1b14] active:scale-[0.98] transition-all"
              >
                Ver proceso de admisión
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://runachay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-[#FBF6EE] transition-colors"
              >
                Inscribir en Runachay
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
