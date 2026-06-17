import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Building2,
  CheckCircle,
  Database,
  FileCheck2,
  Globe2,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad - Colegios Arquidiocesanos",
  description:
    "Aviso de privacidad para el tratamiento de datos personales de las fundaciones educativas administradoras de los Colegios Arquidiocesanos.",
};

const fundaciones = [
  {
    nombre: "Fundación Educativa Santa Isabel de Hungría",
    titulo:
      "Aviso de privacidad para recolectar las autorizaciones de la información ya consignada en las bases de datos de la Fundación Educativa Santa Isabel de Hungría",
    descripcion:
      "La Fundación Educativa Santa Isabel de Hungría, comprometida con la seguridad y protección de los datos personales de sus clientes, empleados, proveedores y demás titulares, de conformidad con el Articulo 15 y 20 de la Constitución política Colombiana, y en desarrollo a la Ley 1581 de 2012 y el Decreto número 1377 del 27 de Junio de 2013, mediante las cuales se dictan disposiciones y reglamentaciones para la protección de datos personales y como único encargado y responsable del tratamiento de sus datos personales consignados en las bases de datos, la Fundación Educativa Santa Isabel de Hungría, estableció medidas para el manejo de los datos personales de los cuales hace tratamiento y que posee en sus bases de datos de todos los titulares o quienes consideren que tienen este carácter (Empleados, aspirantes, población estudiantil y proveedores).",
    politicas:
      "Dentro de las presentes políticas de protección de datos personales la Fundación Educativa Santa Isabel de Hungría, ofrece los mecanismos idóneos y a la vanguardia con las TICS tendientes a garantizar la seguridad en la recolección y tratamiento de los datos personales que posee en sus bases de datos. Igualmente, otorgar a los titulares de los datos personales el acceso a los diferentes canales de comunicación de la Fundación Educativa Santa Isabel de Hungría, para hacer valer sus derechos como titular para que en cualquier momento pueda suprimir, rectificar o actualizar su información.",
    finalidades: [
      "Ofertar y comercializar los diferentes servicios de la Fundación Educativa Santa Isabel de Hungría.",
      "Análisis estadísticos internos.",
      "Realizar todo lo concerniente en materia laboral, entre otras, aplicables a empleados activos e inactivos.",
      "Realizar la actualización de datos y gestión de control.",
      "Publicar en los canales de comunicación de la Fundación Educativa Santa Isabel de Hungría (página web, presentaciones, carteleras, redes sociales) las fotografías a los diferentes eventos que usted asista.",
      "Cumplir con la normatividad vigente aplicable a proveedores y clientes, de carácter tributario y demás que determine la Ley.",
    ],
  },
  {
    nombre: "Fundación Educativa Alberto Uribe Urdaneta",
    titulo:
      "Aviso de privacidad para recolectar las autorizaciones de la información ya consignada en las bases de datos de la Fundación Educativa Alberto Uribe Urdaneta",
    descripcion:
      "La Fundación Educativa Alberto Uribe Urdaneta, comprometida con la seguridad y protección de los datos personales de sus clientes, empleados, proveedores y demás titulares, de conformidad con el Articulo 15 y 20 de la Constitución política Colombiana, y en desarrollo a la Ley 1581 de 2012 y el Decreto número 1377 del 27 de Junio de 2013, mediante las cuales se dictan disposiciones y reglamentaciones para la protección de datos personales y como único encargado y responsable del tratamiento de sus datos personales consignados en las bases de datos, la Fundación Educativa Alberto Uribe Urdaneta, estableció medidas para el manejo de los datos personales de los cuales hace tratamiento y que posee en sus bases de datos de todos los titulares o quienes consideren que tienen este carácter (Empleados, aspirantes, población estudiantil y proveedores).",
    politicas:
      "Dentro de las presentes políticas de protección de datos personales la Fundación Educativa Alberto Uribe Urdaneta, ofrece los mecanismos idóneos y a la vanguardia con las TICS tendientes a garantizar la seguridad en la recolección y tratamiento de los datos personales que posee en sus bases de datos. Igualmente, otorgar a los titulares de los datos personales el acceso a los diferentes canales de comunicación de la Fundación Educativa Alberto Uribe Urdaneta, para hacer valer sus derechos como titular para que en cualquier momento pueda suprimir, rectificar o actualizar su información.",
    finalidades: [
      "Ofertar y comercializar los diferentes servicios de la Fundación Educativa Alberto Uribe Urdaneta.",
      "Análisis estadísticos internos.",
      "Realizar todo lo concerniente en materia laboral, entre otras, aplicables a empleados activos e inactivos.",
      "Realizar la actualización de datos y gestión de control.",
      "Publicar en los canales de comunicación de la Fundación Educativa Alberto Uribe Urdaneta (página web, presentaciones, carteleras, redes sociales) las fotografías a los diferentes eventos que usted asista.",
      "Cumplir con la normatividad vigente aplicable a proveedores y clientes, de carácter tributario y demás que determine la Ley.",
    ],
  },
];

const canales = [
  {
    icon: Globe2,
    label: "Página web",
    text: "www.colegiosarquidiocesanos.edu.co, buzón “PQRSF”.",
  },
  {
    icon: Phone,
    label: "Teléfono",
    text: "(602) 485 02 27 Ext.: 1010",
  },
  {
    icon: MapPin,
    label: "Dirección",
    text: "CRA. 7H BIS No. 76-25 en Santiago de Cali.",
  },
];

const autorizacion =
  "De conformidad con la ley en cita, es necesario que nos otorgue autorización para seguir tratando sus datos personales, lo cual agradecemos hacer en el menor tiempo posible para poder comunicarle información que puede ser de su absoluto interés. Esto, puede hacerlo al correo, indicando simplemente, que nos autoriza hacer uso de sus datos personales conforme las leyes lo permiten. Ahora bien, tal como lo permite el artículo 10, numeral 4 del Decreto 1377, si dentro de los 30 días hábiles siguientes no recibimos su autorización, entenderemos que está de acuerdo con nuestra política y podremos seguir contactándole, cumpliendo las premisas de las leyes aplicables.";

export default function PoliticaDePrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <section className="relative overflow-hidden text-white py-20">
          <div className="absolute inset-0 bg-brand-dark" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url('/images/hero-privacidad.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/70" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-full text-sm font-medium mb-6">
                <ShieldCheck className="h-4 w-4" />
                Protección de datos personales
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Política de <span className="text-brand-gold">Privacidad</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Aviso de privacidad para el tratamiento de información personal en las fundaciones educativas
                administradoras de los Colegios Arquidiocesanos.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-brand-gold py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-3">
              {["Ley 1581 de 2012", "Decreto 1377 de 2013", "Derechos de los titulares"].map((principio) => (
                <div key={principio} className="flex items-center gap-3 text-brand-dark">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-dark/10">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-bold">{principio}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">Fundaciones responsables</h2>
              <p className="text-gray-600 leading-relaxed">
                Esta política reúne la información del aviso de privacidad aplicable a ambas fundaciones educativas
                administradoras de los Colegios Arquidiocesanos.
              </p>
            </div>

            <div className="space-y-10">
              {fundaciones.map((fundacion) => (
                <article key={fundacion.nombre} className="border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-dark text-brand-gold">
                      <Building2 className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold uppercase tracking-wide text-brand-coral-dark mb-2">
                        {fundacion.nombre}
                      </p>
                      <h3 className="text-2xl font-bold text-brand-dark mb-5">{fundacion.titulo}</h3>

                      <div className="space-y-4 text-gray-600 leading-relaxed">
                        <p>{fundacion.descripcion}</p>
                        <p>{fundacion.politicas}</p>
                      </div>

                      <div className="mt-8">
                        <div className="flex items-center gap-3 mb-4">
                          <Database className="h-5 w-5 text-brand-coral-dark" />
                          <h4 className="text-xl font-bold text-brand-dark">
                            Finalidades de recolección y administración
                          </h4>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {fundacion.nombre} realiza la recolección y administración de datos personales y sensibles,
                          de la información suministrada por los titulares o usuarios, para los siguientes fines:
                        </p>
                        <ol className="space-y-3">
                          {fundacion.finalidades.map((finalidad, index) => (
                            <li key={finalidad} className="flex gap-3 text-gray-600 leading-relaxed">
                              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-dark">
                                {index + 1}
                              </span>
                              <span>{finalidad}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark text-brand-gold mb-5">
                  <FileCheck2 className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Canales de atención</h2>
                <p className="text-gray-600 leading-relaxed">
                  Los titulares pueden acceder a estos canales para ejercer sus derechos y solicitar la supresión,
                  rectificación o actualización de su información.
                </p>
              </div>

              <div className="space-y-5">
                {canales.map((canal) => (
                  <div key={canal.label} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold text-brand-dark">
                      <canal.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark">{canal.label}</h3>
                      <p className="text-gray-600">{canal.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-dark rounded-2xl p-8 md:p-10 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Autorización para el tratamiento de datos</h2>
              <p className="text-gray-300 leading-relaxed">{autorizacion}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
