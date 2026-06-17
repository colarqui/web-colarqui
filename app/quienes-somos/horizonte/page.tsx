"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Target,
  Eye,
  Award,
  Crown,
  Shield,
  Heart,
  TrendingUp,
  BookOpen,
  Scale,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const valores = [
  { icon: Crown, label: "Liderazgo", desc: "Formamos líderes con visión transformadora para la sociedad." },
  { icon: Shield, label: "Transparencia", desc: "Gestionamos recursos con honestidad y rendición de cuentas." },
  { icon: TrendingUp, label: "Responsabilidad", desc: "Asumimos compromisos con nuestra comunidad educativa." },
  { icon: Heart, label: "Resiliencia", desc: "Nos adaptamos y superamos desafíos con fortaleza y esperanza." },
];

const principios = [
  { icon: BookOpen, label: "Evangelio", desc: "La Palabra de Dios guía nuestra misión educativa." },
  { icon: Scale, label: "Justicia Social", desc: "Trabajamos por una sociedad más equitativa y solidaria." },
  { icon: Heart, label: "Caridad y Servicio", desc: "Amor al prójimo expresado en acciones concretas." },
  { icon: Users, label: "Dignidad de la persona", desc: "Cada ser humano es respetado en su integralidad." },
];

export default function HorizontePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden text-white py-24">
          <div className="absolute inset-0 bg-brand-dark" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url('/images/estudiantes-hero-horizonte.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/70" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Horizonte <span className="text-brand-gold">Institucional</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conoce los pilares que guían nuestra labor educativa en las Fundaciones Santa Isabel de Hungría y Alberto Uribe Urdaneta.
            </p>
          </div>
        </section>

        {/* Misión + Visión */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Misión */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-brand-gold" />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark mb-4">Misión Institucional</h2>
                <p className="text-gray-600 leading-relaxed">
                  Las Fundaciones Educativas Santa Isabel de Hungría y Alberto Uribe Urdaneta pertenecen a la Arquidiócesis de Cali. Son organizaciones que administran las instituciones educativas propias o confiadas a su cuidado y gestionan con efectividad los recursos, especialmente los del talento humano, bajo los principios de la Iglesia católica en su misión social de educar.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="h-6 w-6 text-brand-coral" />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark mb-4">Visión Institucional</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ser reconocidos a nivel territorial por gestionar una oferta educativa diversa, de calidad y sostenible a lo largo del tiempo para aportar en la transformación social.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Política de Calidad */}
        <section className="py-20 bg-gray-50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-6 w-6 text-brand-gold" />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark mb-4">Política de la Calidad</h2>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Estamos comprometidos con el mejoramiento de la calidad educativa, mediante la administración efectiva de Instituciones Educativas que ofrecen formación integral a niños, niñas y adolescentes.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-1.5 bg-brand-gold rounded-full flex-shrink-0 self-stretch" />
                  <p className="text-gray-600 leading-relaxed">
                    Garantizamos la disponibilidad de ambientes escolares propicios para el desarrollo de los estudiantes con un equipo de trabajo comprometido, motivado y cualificado que define los lineamientos estratégicos del quehacer educativo, respondiendo a los principios de la iglesia católica y al cumplimiento de requisitos aplicables.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 bg-brand-coral rounded-full flex-shrink-0 self-stretch" />
                  <p className="text-gray-600 leading-relaxed">
                    Aseguramos el impacto social y ambiental esperado, la viabilidad financiera y el mejoramiento continuo de nuestro sistema de gestión de la calidad, ofreciendo a nuestras partes interesadas la mejor experiencia de servicio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Sparkles className="h-8 w-8 text-brand-gold mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-brand-dark mb-2">Valores</h2>
              <p className="text-gray-600">Los pilares de nuestra identidad institucional</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valores.map((v) => (
                <div key={v.label} className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <v.icon className="h-6 w-6 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{v.label}</h3>
                  <p className="text-gray-600 text-base">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principios */}
        <section className="py-20 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <BookOpen className="h-8 w-8 text-brand-coral mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-brand-dark mb-2">Principios</h2>
              <p className="text-gray-600">Nuestra inspiración desde la fe y la doctrina social de la Iglesia</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principios.map((p) => (
                <div key={p.label} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <p.icon className="h-6 w-6 text-brand-coral" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{p.label}</h3>
                  <p className="text-gray-600 text-base">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url('/images/estudiantes-cta-horizonte.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/70" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Conoce nuestras <span className="text-brand-gold">instituciones</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              31 colegios en toda Cali formando líderes con valores cristianos desde hace más de 65 años.
            </p>
            <a
              href="/colegios"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-10 py-5 rounded-xl font-bold text-lg hover:bg-brand-gold/90 transition-all hover:scale-105"
            >
              Ver colegios
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
