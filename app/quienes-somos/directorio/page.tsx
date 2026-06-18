"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Building2, Search, Smartphone } from "lucide-react";
import { useState } from "react";

const PBX = "602 485 0227";

const colegios = [
  { nombre: "Unidad Administrativa", sede: null, celular: null, exts: [
    { ext: "1000", area: "Recepción" }, { ext: "1010", area: "Secretaría Ejecutiva" }, { ext: "1011", area: "Asistente de Cobertura" },
    { ext: "1012", area: "Líder Financiero" }, { ext: "1014", area: "Director Ejecutivo" }, { ext: "1016", area: "Registro Académico" },
    { ext: "1017", area: "Coordinadora de Calidad" }, { ext: "1020", area: "Secretaría Talento Humano" }, { ext: "1021", area: "Coordinación Talento Humano" },
    { ext: "1022", area: "Salud Ocupacional" }, { ext: "1023", area: "Nómina" }, { ext: "1024", area: "Psicología Selección" },
    { ext: "1025", area: "Aux. Prestaciones" }, { ext: "1030", area: "Ventanilla Única" }, { ext: "1031", area: "Compras" },
    { ext: "1032", area: "Coordinación Compras y Servicios" }, { ext: "1033", area: "Gestión Documental" }, { ext: "1040", area: "Tesorería" },
    { ext: "1041", area: "Asistente de Mercadeo" }, { ext: "1050", area: "Departamento de Cartera" }, { ext: "1052", area: "Auxiliar de Cartera" },
    { ext: "1073", area: "Soporte Sistemas" }, { ext: "1080", area: "Contabilidad" },
  ]},
  { nombre: "Colegio Bartolomé Mitre", sede: null, celular: "317 3870703", exts: [{ ext: "1300", area: "Secretaría" }, { ext: "1310", area: "Rectoría" }, { ext: "1320", area: "Coordinación" }, { ext: "1340", area: "Psicología" }] },
  { nombre: "Colegio Parroquial San Pedro Claver", sede: null, celular: "316 4806820", exts: [{ ext: "2200", area: "Secretaría Académica" }, { ext: "2210", area: "Rectoría" }, { ext: "2220", area: "Coordinación General" }, { ext: "2240", area: "Psicología" }] },
  { nombre: "Santa Isabel de Hungría", sede: "Alfonso López", celular: "316 2784605", exts: [{ ext: "3500", area: "Secretaría / Recepción" }, { ext: "3510", area: "Rectoría" }, { ext: "3520", area: "Coordinación Académica" }, { ext: "3521", area: "Coordinación Bienestar" }, { ext: "3522", area: "Coordinación General Escuela Taller" }, { ext: "3523", area: "Coordinación Académica 2" }, { ext: "3540", area: "Psicología y Enfermería" }] },
  { nombre: "I.E. Llano Verde", sede: "Calimio Desepaz", celular: "316 2824060", exts: [{ ext: "3600", area: "Secretaría Académica" }, { ext: "3621", area: "Coordinación Académica" }, { ext: "3623", area: "Coordinación Bienestar" }] },
  { nombre: "I.E. Llano Verde", sede: "Calimio Norte", celular: "316 5278775", exts: [{ ext: "3700", area: "Secretaría Auxiliar" }, { ext: "3701", area: "Secretaría Académica" }, { ext: "3710", area: "Rector" }, { ext: "3740", area: "Psicología" }] },
  { nombre: "Colegio Santa Isabel de Hungría", sede: "Ciudad 2000", celular: "316 5260723", exts: [{ ext: "3800", area: "Secretaría Académica" }, { ext: "3810", area: "Rectoría" }, { ext: "3820", area: "Coordinación Académica" }, { ext: "3840", area: "Psicología" }] },
  { nombre: "I.E. Llano Verde", sede: "Aguacatal", celular: "316 5247893", exts: [{ ext: "4300", area: "Secretaría Auxiliar" }, { ext: "4301", area: "Secretaría Académica" }, { ext: "4310", area: "Rectoría" }, { ext: "4320", area: "Coordinación" }, { ext: "4340", area: "Psicología" }] },
  { nombre: "Colegio Parroquial San Francisco Javier", sede: "Orquídeas", celular: "315 4712732", exts: [{ ext: "4600", area: "Secretaría Académica" }, { ext: "4610", area: "Rectoría" }, { ext: "4620", area: "Coordinación Académica" }, { ext: "4640", area: "Psicología" }] },
  { nombre: "Colegio Mayor Santiago de Cali", sede: null, celular: "315 3360204", exts: [{ ext: "4900", area: "Secretaría Académica" }, { ext: "4910", area: "Rector" }, { ext: "4920", area: "Coordinación General" }, { ext: "4940", area: "Psicología" }] },
  { nombre: "I.E. Llano Verde", sede: "Comuneros II", celular: "316 4677048", exts: [{ ext: "5000", area: "Secretaría Académica" }, { ext: "5010", area: "Rector" }, { ext: "5020", area: "Coordinación Bienestar" }, { ext: "5040", area: "Psicología" }] },
  { nombre: "I.E. Llano Verde", sede: "Invicali", celular: "316 2730195", exts: [{ ext: "4000", area: "Secretaría" }, { ext: "4010", area: "Rectoría" }, { ext: "4021", area: "Coordinación de Bienestar" }, { ext: "4040", area: "Psicología" }] },
  { nombre: "I.E. Llano Verde", sede: "San Felipe", celular: "316 5277785", exts: [{ ext: "4100", area: "Secretaría Académica" }, { ext: "4110", area: "Rectoría" }, { ext: "4120", area: "Coordinación Académica" }, { ext: "4121", area: "Coordinación de Bienestar" }] },
  { nombre: "I.E. Llano Verde", sede: "San Luis", celular: "316 4784577", exts: [{ ext: "4200", area: "Secretaría" }, { ext: "4210", area: "Rector" }, { ext: "4220", area: "Coordinación Académica" }, { ext: "4240", area: "Psicología" }] },
  { nombre: "I.E. Llano Verde", sede: "Sede Principal", celular: "317 4299270", exts: [{ ext: "6000", area: "Secretaría" }, { ext: "6010", area: "Rectoría" }, { ext: "6020", area: "Coordinación" }, { ext: "6040", area: "Psicología" }, { ext: "6090", area: "Portería" }] },
  { nombre: "I.E. Llano Verde", sede: "Colegio Nariño", celular: "318 6104911", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }] },
  { nombre: "Colegio Nuestra Señora de Chiquinquirá", sede: null, celular: "318 5241934", exts: [{ ext: "7000", area: "Secretaría Académica" }, { ext: "7010", area: "Rectoría" }, { ext: "7020", area: "Coordinación General" }, { ext: "7040", area: "Psicología" }] },
  { nombre: "Colegio La Presentación El Paraíso", sede: null, celular: null, exts: [{ ext: "8000", area: "Secretaría" }, { ext: "8010", area: "Rectoría" }, { ext: "8020", area: "Coordinación" }, { ext: "8040", area: "Psicología" }] },
  { nombre: "Institución Educativa Nelson Garcés Vernaza", sede: null, celular: "304 2390401", exts: [{ ext: "9000", area: "Secretaría" }, { ext: "9010", area: "Rectoría" }, { ext: "9020", area: "Coordinación Académica" }, { ext: "9030", area: "Coordinación Bienestar" }, { ext: "9040", area: "Bibliobanco" }] },
];

const directos = [
  { nombre: "Institución Nuestra Señora del Rosario", sede: "Jamundí", tel: "553 0847", celular: "317 5175728", exts: [{ ext: "3400", area: "Secretaría" }, { ext: "3410", area: "Rectoría" }, { ext: "3420", area: "Coordinación" }, { ext: "3440", area: "Psicología" }] },
  { nombre: "Institución Educativa San Francisco Javier", sede: "Yumbo", tel: "669 1960", celular: "315 4151822", exts: [{ ext: "3100", area: "Secretaría" }, { ext: "3110", area: "Rectoría" }, { ext: "3120", area: "Coordinación" }, { ext: "3140", area: "Psicología" }] },
  { nombre: "La Providencia", sede: null, tel: "403 2287", celular: "317 3771646", exts: [{ ext: "—", area: "Secretaría" }] },
  { nombre: "Colegio Santa Luisa de Marillac", sede: null, tel: null, celular: "317 7518865", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Colegio Parroquial San Joaquín", sede: null, tel: null, celular: "315 8175663", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Colegio Parroquial San Joaquín 2", sede: null, tel: null, celular: "317 4391873", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Colegio Arquidiocesano Juan Pablo II", sede: null, tel: null, celular: "317 4033624", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Centro Docente Parroquial San Marcos", sede: null, tel: null, celular: "317 5165504", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Colegio Compartir", sede: null, tel: null, celular: "316 5288959", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Colegio Parroquial Santiago Apóstol", sede: null, tel: null, celular: "315 5778814", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Colegio Parroquial San Juan Bautista", sede: null, tel: null, celular: "315 3084256", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Colegio Parroquial Nuestra Señora de Guadalupe", sede: null, tel: null, celular: "316 5238723", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Instituto Comercial Arquidiocesano", sede: null, tel: null, celular: "316 5268469", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
  { nombre: "Colegio Parroquial Nuestra Señora de los Andes", sede: null, tel: null, celular: "315 6292790", exts: [{ ext: "—", area: "Secretaría" }, { ext: "—", area: "Rectoría" }, { ext: "—", area: "Coordinación" }, { ext: "—", area: "Psicología" }] },
];

export default function DirectorioPage() {
  const [q, setQ] = useState("");
  const match = (c: any) => `${c.nombre} ${c.sede || ""} ${c.celular || ""}`.toLowerCase().includes(q.toLowerCase());
  const telLink = (n: string) => `tel:+57${n.replace(/\s/g, "")}`;

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
              backgroundImage: `url('/images/colaborador-hero-directorio.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/70" />
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <Phone className="h-8 w-8 text-brand-gold mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Directorio <span className="text-brand-gold">Telefónico</span></h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Comunícate con nuestras instituciones educativas y la Unidad Administrativa.</p>
          </div>
        </section>

        {/* PBX */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-brand-dark rounded-2xl p-8 text-center text-white">
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-2">PBX Principal / Oficial</h2>
              <a href={telLink(PBX)} className="text-4xl font-bold text-brand-gold hover:text-white transition-colors inline-flex items-center gap-3"><Phone className="h-8 w-8" />{PBX}</a>
              <p className="text-gray-400 mt-4 text-sm">Haz click para llamar · Extensiones listadas abajo</p>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="pb-10 bg-white">
          <div className="max-w-xl mx-auto px-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Buscar colegio o sede..." value={q} onChange={e => setQ(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold focus:bg-white outline-none transition-all" />
            </div>
          </div>
        </section>

        {/* Colegios con PBX */}
        <section className="py-6 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2"><Building2 className="h-5 w-5 text-brand-coral" />Colegios — Extensiones del PBX {PBX}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {colegios.filter(match).map(c => (
                <div key={`${c.nombre}-${c.sede || "u"}`} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="mb-3">
                    <h3 className="font-bold text-brand-dark">{c.nombre}</h3>
                    {c.sede && <p className="text-xs text-brand-coral-dark font-medium">{c.sede}</p>}
                    {c.celular && (
                      <a href={telLink(c.celular)} className="text-sm text-brand-coral font-medium inline-flex items-center gap-1 mt-1 hover:underline">
                        <Smartphone className="h-3 w-3" /> {c.celular}
                      </a>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    {c.exts.map(e => (
                      <a key={e.ext} href={telLink(`${PBX.replace(/\s/g, "")},${e.ext}`)} className="flex items-center justify-between p-2.5 bg-white rounded-lg hover:shadow-sm transition-shadow group">
                        <span className="text-gray-600 text-sm">{e.area}</span>
                        <span className="font-bold text-brand-dark group-hover:text-brand-gold transition-colors flex items-center gap-2 text-sm">Ext. {e.ext}<Phone className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" /></span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Líneas directas */}
        <section className="py-12 bg-gray-50 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2"><Phone className="h-5 w-5 text-brand-gold" />Líneas Telefónicas Directas</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {directos.filter(match).map(c => (
                <div key={c.nombre} className="bg-white rounded-xl p-5 border border-gray-100">
                  <div className="mb-3">
                    <h3 className="font-bold text-brand-dark">{c.nombre}</h3>
                    {c.sede && <p className="text-xs text-brand-coral-dark font-medium">{c.sede}</p>}
                    {c.tel && (
                      <a href={telLink(c.tel)} className="text-lg font-bold text-brand-gold hover:text-brand-dark transition-colors mt-1 inline-flex items-center gap-2">{c.tel}<Phone className="h-4 w-4" /></a>
                    )}
                    {c.celular && (
                      <a href={telLink(c.celular)} className="text-sm text-brand-coral font-medium inline-flex items-center gap-1 mt-1 hover:underline">
                        <Smartphone className="h-3 w-3" /> {c.celular}
                      </a>
                    )}
                  </div>
                  <div className="space-y-1">
                    {c.exts.map(e => (
                      <div key={e.ext} className="flex justify-between p-2 bg-gray-50 rounded-lg text-sm">
                        <span className="text-gray-600">{e.area}</span>
                        {e.ext !== "—" && <span className="font-bold text-brand-dark">Ext. {e.ext}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
