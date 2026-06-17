"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import {
  FileText, ExternalLink, Building2, ChevronRight,
  HeartHandshake, HardHat, BarChart3, Lock,
} from "lucide-react";

type Reporte = { anio: number; estado: "disponible" | "externo" | "proximamente"; desc: string; href?: string };

const REPORTES: Record<string, Reporte[]> = {
  FESIH: [
    { anio: 2025, estado: "proximamente", desc: "Informe en elaboración. Próximamente disponible." },
    { anio: 2024, estado: "disponible", desc: "Impacto educativo y social durante el año 2024.", href: "/transparencia/informes-gestion-social/2024/fesih" },
    { anio: 2023, estado: "disponible", desc: "Reinversión de recursos y actividades meritorias del año 2023.", href: "/transparencia/informes-gestion-social/2023/fesih" },
    { anio: 2022, estado: "disponible", desc: "Transparencia fiscal y gestión educativa del año 2022.", href: "/transparencia/informes-gestion-social/2022/fesih" },
    { anio: 2021, estado: "externo", desc: "Informe de gestión anual con actividades meritorias del año 2021.", href: "https://colegiosarquidiocesanos.edu.co/_rte-sih/2021/informacion-tributaria-2021.html" },
    { anio: 2020, estado: "externo", desc: "Memoria económica y actividades de impacto social durante 2020.", href: "https://colegiosarquidiocesanos.edu.co/_rte-sih/2020/informacion-tributaria-2020.html" },
    { anio: 2019, estado: "disponible", desc: "Informe de reinversión de excedentes y actividades sociales del año 2019.", href: "/transparencia/informes-gestion-social/FESIH/2019" },
    { anio: 2018, estado: "disponible", desc: "Transparencia fiscal y distribución de excedentes del año 2018.", href: "/transparencia/informes-gestion-social/FESIH/2018" },
    { anio: 2017, estado: "disponible", desc: "Primer informe de gestión social correspondiente al año 2017.", href: "/transparencia/informes-gestion-social/FESIH/2017" },
  ],
  FAUU: [
    { anio: 2025, estado: "proximamente", desc: "Informe en elaboración. Próximamente disponible." },
    { anio: 2024, estado: "disponible", desc: "Impacto educativo y social durante el año 2024.", href: "/transparencia/informes-gestion-social/2024/fauu" },
    { anio: 2023, estado: "disponible", desc: "Reinversión de recursos y actividades meritorias del año 2023.", href: "/transparencia/informes-gestion-social/2023/fauu" },
    { anio: 2022, estado: "disponible", desc: "Transparencia fiscal y gestión educativa del año 2022.", href: "/transparencia/informes-gestion-social/2022/fauu" },
    { anio: 2021, estado: "externo", desc: "Informe de gestión anual con actividades meritorias del año 2021.", href: "https://colegiosarquidiocesanos.edu.co/_rte-auu/2021/informacion-tributaria-2021.html" },
    { anio: 2020, estado: "externo", desc: "Memoria económica y actividades de impacto social durante 2020.", href: "https://colegiosarquidiocesanos.edu.co/_rte-auu/2020/informacion-tributaria-2020.html" },
    { anio: 2019, estado: "disponible", desc: "Informe de reinversión de excedentes y actividades sociales del año 2019.", href: "/transparencia/informes-gestion-social/FAUU/2019" },
    { anio: 2018, estado: "disponible", desc: "Transparencia fiscal y distribución de excedentes del año 2018.", href: "/transparencia/informes-gestion-social/FAUU/2018" },
    { anio: 2017, estado: "disponible", desc: "Primer informe de gestión social correspondiente al año 2017.", href: "/transparencia/informes-gestion-social/FAUU/2017" },
  ],
};

export default function InformesGestionSocialPage() {
  const [fund, setFund] = useState<"FESIH" | "FAUU">("FESIH");
  const data = REPORTES[fund];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/IMG_1352-scaled-1.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-brand-dark/70" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                <HeartHandshake className="h-4 w-4 text-brand-gold" />
                <span className="text-white/90 text-sm font-medium">Transparencia Institucional</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Informes de <span className="text-brand-gold">Gestión Social</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-10">
                Conoce cómo las fundaciones educativas reinvierten los recursos en actividades meritorias de educación, salud y cultura para generar impacto social en la región.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#reportes" className="bg-brand-gold text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-gold/90 transition-all flex items-center gap-2">
                  Ver reportes anuales <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="que-es" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">
                ¿Qué son los <span className="text-brand-gold">Informes de Gestión Social</span>?
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Las fundaciones educativas que conforman los Colegios Arquidiocesanos, como Entidades Sin Ánimo de Lucro (ESAL), reportan anualmente la reinversión de sus excedentes en actividades meritorias de educación, salud y cultura.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-brand-dark" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">Transparencia Fiscal</h3>
                <p className="text-gray-500 text-sm">Estados financieros, memoria económica y distribución de excedentes.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="h-6 w-6 text-brand-dark" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">Impacto Social</h3>
                <p className="text-gray-500 text-sm">Actividades educativas, culturales y de salud realizadas en la región.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-brand-dark" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">Régimen Tributario Especial</h3>
                <p className="text-gray-500 text-sm">Calificación ante la DIAN y cumplimiento de obligaciones legales.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="reportes" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Reportes por <span className="text-brand-gold">fundación y año</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Selecciona la fundación para consultar los informes disponibles de cada año.</p>
            </div>

            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-white rounded-2xl border border-gray-200 p-1.5 shadow-sm">
                <button onClick={() => setFund("FESIH")} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${fund === "FESIH" ? "bg-brand-dark text-white shadow-md" : "text-gray-600 hover:text-brand-dark"}`}>
                  <Building2 className="h-4 w-4" /> FESIH
                </button>
                <button onClick={() => setFund("FAUU")} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${fund === "FAUU" ? "bg-brand-dark text-white shadow-md" : "text-gray-600 hover:text-brand-dark"}`}>
                  <Building2 className="h-4 w-4" /> FAUU
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.map((r) => {
                const isProx = r.estado === "proximamente";
                const isExt = r.estado === "externo";
                const Wrapper = isProx ? "div" : isExt ? "a" : "a";
                const accentColor = fund === "FESIH" ? "#C9A227" : "#BB1F22";
                const borderStyle = { borderColor: `${accentColor}44` };
                const hoverBorderClass = fund === "FESIH"
                  ? "hover:border-brand-gold hover:shadow-brand-gold/10"
                  : "hover:border-[#BB1F22] hover:shadow-[#BB1F22]/10";
                const wrapperProps = isProx
                  ? { className: "block bg-white rounded-2xl border p-6 opacity-60", style: borderStyle }
                  : { href: r.href, target: isExt ? "_blank" : undefined, rel: isExt ? "noopener noreferrer" : undefined, className: `block bg-white rounded-2xl border p-6 hover:shadow-lg transition-all group ${hoverBorderClass}`, style: borderStyle };
                return (
                  <Wrapper key={r.anio} {...wrapperProps}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border ${isProx ? "bg-amber-50 text-amber-700 border-amber-200" : isExt ? "bg-gray-50 text-gray-600 border-gray-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                        {isProx ? <HardHat className="h-3 w-3" /> : isExt ? <ExternalLink className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                        {isProx ? "En construcción" : isExt ? "Enlace externo" : "Disponible"}
                      </div>
                      <span className="text-3xl font-bold transition-colors" style={{ color: `${accentColor}22` }}>{r.anio}</span>
                    </div>
                    <h3 className="font-bold text-brand-dark text-lg mb-1">Informe {r.anio}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{r.desc}</p>
                    {!isProx && (
                      <span className="inline-flex items-center gap-1 font-semibold text-sm group-hover:gap-2 transition-all" style={{ color: accentColor }}>
                        {isExt ? "Visitar informe" : "Ver informe"} <ChevronRight className="h-4 w-4" />
                      </span>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
