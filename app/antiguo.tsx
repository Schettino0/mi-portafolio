"use client"; // Necesario para que el botón de contacto funcione
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-900 selection:text-cyan-50 scroll-smooth">

      {/* Barra de Navegación */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-6 text-sm font-semibold tracking-wide">
          <a href="#sobre-mi" className="text-slate-400 hover:text-cyan-400 transition-colors">SOBRE MÍ</a>
          <a href="#experiencia" className="text-slate-400 hover:text-cyan-400 transition-colors">EXPERIENCIA</a>
          <a href="#proyectos" className="text-slate-400 hover:text-cyan-400 transition-colors">PROYECTOS</a>
          <a href="#estudios" className="text-slate-400 hover:text-cyan-400 transition-colors">ESTUDIOS</a>
          <a href="#contacto" className="text-slate-400 hover:text-cyan-400 transition-colors">CONTACTO</a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-24 space-y-20">

        {/* 1. SECCIÓN HERO */}
        <section className="flex flex-col md:flex-row items-center gap-12 pt-10">
          <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-800 shadow-[0_0_30px_rgba(8,145,178,0.3)]">
              <Image
                src="/img_6762.jpeg"
                alt="Eduardo Schettino"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              Eduardo <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Schettino</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-3 text-lg font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Automatización y Robótica
              </span>
              <span className="hidden md:inline text-slate-700">|</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Computación e Informática
              </span>
            </div>
            <p className="max-w-lg mt-4 text-slate-400 leading-relaxed">
              Especialista en integración de sistemas, control de procesos y desarrollo de soluciones tecnológicas para la industria.
            </p>
          </div>
        </section>

        {/* 2. SOBRE MÍ */}
        <section id="sobre-mi" className="scroll-mt-32 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-transparent"></div>
          <h2 className="text-3xl font-bold text-white mb-6">Sobre mí</h2>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-slate-300">
              Tengo 28 años y mi perfil profesional se construyó en dos etapas complementarias: inicialmente me formé en Automatización y Robótica, para posteriormente expandir mis capacidades estudiando Ingeniería en Computación e Informática. Me destaco por mi agilidad para asimilar nuevos conocimientos y mi enfoque en el aprendizaje continuo, ya sea dominando nuevas plataformas industriales o adoptando tecnologías emergentes para la optimización de procesos.
            </p>
          </div>
        </section>

        {/* 3. EXPERIENCIA LABORAL */}
        {/* 3. EXPERIENCIA LABORAL */}
        <section id="experiencia" className="scroll-mt-32">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-cyan-500">⚡</span> Experiencia Laboral
          </h2>
          <div className="space-y-6">

            {/* Tarjeta 1 - SCA Ingeniería */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-cyan-900/50 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">

                {/* Contenedor del Logo y Títulos */}
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-700">
                    {/* Asegúrate de que tu archivo se llame sca.png en la carpeta public */}
                    <Image src="/sca_logo.jpg" alt="Logo SCA Ingeniería" fill className="object-contain p-2" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Ingeniero en Automatización</h3>
                    <p className="text-cyan-400 font-medium text-lg">SCA Ingeniería Ltda.</p>
                  </div>
                </div>

                <span className="text-slate-400 text-sm font-mono bg-slate-950 px-4 py-2 rounded-full border border-slate-800 mt-2 md:mt-0 w-fit shadow-inner">
                  Noviembre 2024 - Presente
                </span>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Participación integral en proyectos de automatización industrial, abarcando desde el ciclo de desarrollo y levantamiento de requerimientos hasta la validación y puesta en marcha de soluciones.
              </p>

              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 mt-1">▹</span>
                  <span>Programación y configuración de equipos Rockwell (PLC Allen-Bradley) utilizando <strong>Studio 5000</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 mt-1">▹</span>
                  <span>Desarrollo e integración de interfaces HMI mediante <strong>AVEVA System Platform IDE</strong> y <strong>FactoryTalk View</strong>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 mt-1">▹</span>
                  <span>Ejecución de pruebas de comisionamiento en terreno y validación funcional de equipos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 mt-1">▹</span>
                  <span>Coordinación técnica con equipos multidisciplinarios y generación de documentación para soporte y operación.</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="bg-blue-950/60 text-blue-300 text-xs px-3 py-1.5 rounded-md border border-blue-800/60 font-medium">Studio 5000</span>
                <span className="bg-teal-950/60 text-teal-300 text-xs px-3 py-1.5 rounded-md border border-teal-800/60 font-medium">AVEVA System Platform</span>
                <span className="bg-orange-950/60 text-orange-300 text-xs px-3 py-1.5 rounded-md border border-orange-800/60 font-medium">FactoryTalk View</span>
                <span className="bg-red-950/60 text-red-300 text-xs px-3 py-1.5 rounded-md border border-red-800/60 font-medium">Rockwell / Allen-Bradley</span>
              </div>
            </div>

            {/* Tarjeta 2 - Sodimac */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-cyan-900/50 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">

                {/* Contenedor del Logo y Títulos */}
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-700">
                    {/* Asegúrate de que tu archivo se llame sodimac.png en la carpeta public */}
                    <Image src="/sodimac_chile_logo.jpg" alt="Logo Sodimac" fill className="object-contain p-2" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Técnico en Automatización y Robótica</h3>
                    <p className="text-cyan-400 font-medium text-lg">Sodimac</p>
                  </div>
                </div>

                <span className="text-slate-400 text-sm font-mono bg-slate-950 px-4 py-2 rounded-full border border-slate-800 mt-2 md:mt-0 w-fit shadow-inner">
                  Mayo 2020 - Agosto 2023
                </span>
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Colaboración en la implementación de vehículos sin tripulación para la gestión de movimientos y almacenamiento, optimizando la logística para los envíos a domicilio. Verificación de cambios realizados por desarrolladores extranjeros para asegurar su integración con los sistemas existentes.
              </p>

              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-3"><span className="text-cyan-500 mt-1">▹</span><span>Proporcioné apoyo en proyectos de robótica como SBS y FLR para la automatización del flujo en la bodega con vehículos sin tripulación.</span></li>
                <li className="flex items-start gap-3"><span className="text-cyan-500 mt-1">▹</span><span>Ofrecí soporte a dos brazos robóticos ABB y al sistema de correas y poleas para el transporte de pallets.</span></li>
                <li className="flex items-start gap-3"><span className="text-cyan-500 mt-1">▹</span><span>Colaboré con equipos de mantenimiento, desarrollo y operaciones para optimizar la producción.</span></li>
                <li className="flex items-start gap-3"><span className="text-cyan-500 mt-1">▹</span><span>Desarrollé macros en Excel para la extracción de datos y monitoreé KPIs para evaluar el rendimiento.</span></li>
                <li className="flex items-start gap-3"><span className="text-cyan-500 mt-1">▹</span><span>Capacité a los operarios en el manejo de sistemas automatizados y participé en reuniones técnicas para compartir avances.</span></li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="bg-red-950/60 text-red-300 text-xs px-3 py-1.5 rounded-md border border-red-800/60 font-medium">Robótica ABB</span>
                <span className="bg-slate-800/60 text-slate-300 text-xs px-3 py-1.5 rounded-md border border-slate-700/60 font-medium">Vehículos sin tripulación</span>
                <span className="bg-slate-800/60 text-slate-300 text-xs px-3 py-1.5 rounded-md border border-slate-700/60 font-medium">SBS y FLR</span>
                <span className="bg-green-950/60 text-green-300 text-xs px-3 py-1.5 rounded-md border border-green-800/60 font-medium">Excel Macros / KPIs</span>
              </div>
            </div>

          </div>
        </section>

        {/* 5. ESTUDIOS Y CERTIFICACIONES */}
        <section id="estudios" className="scroll-mt-32">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-blue-500">🎓</span> Formación y Certificaciones
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Académico */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Académico</h3>
              <div className="flex justify-center mb-4">
                <div className="relative w-24 h-24">
                  <Image src="/unab.jpg" alt="Logo UNAB" fill className="object-contain rounded-xl" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/40 border-l-4 border-cyan-500 rounded-r-xl">
                  <h4 className="font-bold text-white text-m  leading-tight">Ingeniería en Computación e Informática</h4>
                  <p className="text-[12px] text-slate-500 mt-1 uppercase">2023 - 2025</p>
                </div>
                <div className="p-4 bg-slate-900/40 border-l-4 border-cyan-500 rounded-r-xl">
                  <h4 className="font-bold text-white text-m leading-tight">Ingeniería en Automatización y Robótica</h4>
                  <p className="text-[12px] text-slate-500 mt-1 uppercase">2016 - 2021</p>
                </div>
              </div>
            </div>

            {/* AVEVA */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">AVEVA Certified</h3>
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col items-center">
                <div className="relative w-20 h-20 mb-3">
                  <Image src="/Aveva_badge.jpg" alt="AVEVA Badge" fill className="object-contain drop-shadow-[0_0_10px_rgba(20,184,166,0.3)]" />
                </div>
                <h4 className="text-[15px] font-bold text-white">System Platform Professional</h4>
              </div>
              <ul className="text-[15px] space-y-2 text-slate-400">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> System Platform & OMI Certification</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  Application Server Certification</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  InTouch for System Platform</li>
              </ul>
            </div>

            {/* Control & Dev */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Control & Dev</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/20 border border-slate-800 rounded-xl">
                  <p className="text-[15px] font-bold text-amber-500 uppercase mb-2">PLC / HMI</p>
                  <p className="text-[14px] text-slate-100">Siemens TIA Portal • Allen Bradley • Planos Eléctricos</p>
                </div>
                <div className="p-4 bg-slate-900/20 border border-slate-800 rounded-xl">
                  <p className="text-[15px] font-bold text-blue-500 uppercase mb-2">Development</p>
                  <p className="text-[14px] text-slate-100">React JS • Backend Essentials • IBM AI Developer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CONTACTO */}
        <section id="contacto" className="scroll-mt-32 pb-20">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-12 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

            {!showContact ? (
              <>
                <h2 className="text-3xl font-black text-white mb-4 italic">¿Quieres trabajar conmigo?</h2>
                <p className="text-slate-400 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
                  Estoy disponible para nuevos proyectos o consultas técnicas. Haz clic abajo para ver mis datos.
                </p>
                <button
                  onClick={() => setShowContact(true)}
                  className="bg-white text-slate-950 font-black py-4 px-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  MOSTRAR INFORMACIÓN
                </button>
              </>
            ) : (
              <div className="animate-in fade-in zoom-in duration-500 space-y-6">
                <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-widest">Datos de Contacto</h2>
                <div className="space-y-2">
                  <p className="text-2xl md:text-3xl font-black text-white selection:bg-cyan-500">e_schettino@icloud.com</p>
                  <p className="text-2xl md:text-3xl font-black text-slate-400 selection:bg-amber-500">+56 9 8889 5490</p>
                </div>
                <p className="text-xs text-slate-500 italic mt-4">Disponible para proyectos de Automatización e Informática</p>
                <button
                  onClick={() => setShowContact(false)}
                  className="text-[10px] text-slate-600 hover:text-slate-400 uppercase tracking-widest transition-colors"
                >
                  Ocultar datos
                </button>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}