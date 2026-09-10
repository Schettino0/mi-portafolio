"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ── Tipos ──────────────────────────────────────────────────────────────────
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// ── Hook: detecta cuando el elemento entra al viewport ────────────────────
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

// ── Hook: efecto typewriter (cicla entre textos) ───────────────────────────
const useTypewriter = (texts: string[], speed = 75, pause = 2000) => {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && display === current) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && display === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    } else {
      t = setTimeout(() => {
        setDisplay(
          deleting
            ? current.slice(0, display.length - 1)
            : current.slice(0, display.length + 1)
        );
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(t);
  }, [display, idx, deleting, texts, speed, pause]);

  return display;
};

// ── Componente: animación de entrada al scroll ────────────────────────────
const Reveal = ({ children, delay = 0, className = "" }: RevealProps) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ── Componente: chip de tecnología ────────────────────────────────────────
const Chip = ({ label }: { label: string }) => (
  <span className="font-mono text-[10px] tracking-wide text-stone-400 border border-stone-300 px-2.5 py-0.5 rounded">
    {label}
  </span>
);

// ── Componente: bullet de lista ───────────────────────────────────────────
const Bullet = ({ text }: { text: string }) => (
  <div className="flex gap-3 text-[15px] text-stone-500 leading-relaxed">
    <span className="text-stone-300 shrink-0 mt-0.5">—</span>
    <span>{text}</span>
  </div>
);

// ── Componente: fila de experiencia ──────────────────────────────────────
const ExpCard = ({
  logo,
  company,
  role,
  period,
  description,
  bullets,
  chips,
}: {
  logo: string;
  company: string;
  role: string;
  period: string;
  description: string;
  bullets: string[];
  chips: string[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-10 py-12 border-b border-stone-200">
    {/* Columna izquierda */}
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-8 h-8 bg-white rounded-lg overflow-hidden border border-stone-200 shrink-0">
          <Image src={logo} alt={company} fill className="object-contain p-1" />
        </div>
        <span className="font-serif text-xl font-normal text-stone-800">{company}</span>
      </div>
      <p className="font-mono text-[15px] tracking-widest text-stone-400 mb-1">{period}</p>
      <p className="text-[12px] text-stone-400">{role}</p>
    </div>
    {/* Columna derecha */}
    <div>
      <p className="text-[15px] text-stone-500 leading-relaxed mb-5 font-light">{description}</p>
      <div className="flex flex-col gap-3 mb-5">
        {bullets.map((b, i) => <Bullet key={i} text={b} />)}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {chips.map((c, i) => <Chip key={i} label={c} />)}
      </div>
    </div>
  </div>
);

// ── Easter egg: terminal overlay ──────────────────────────────────────────
const TERMINAL_LINES = [
  { prompt: "> whoami",   response: "Eduardo Schettino — Ing. Automatización & Software" },
  { prompt: "> location", response: "Santiago, Chile 🇨🇱" },
  { prompt: "> status",   response: "Disponible para proyectos ✓" },
  { prompt: "> stack",    response: "PLC · SCADA · React · TypeScript · Next.js" },
  { prompt: "> secret",   response: "¡Encontraste el easter egg! 🎉" },
];

const EasterEgg = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= TERMINAL_LINES.length * 2) return;
    const t = setTimeout(() => setStep((s) => s + 1), 340);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg font-mono text-[13px] leading-relaxed rounded-lg overflow-hidden"
        style={{ background: "#0a0907", border: "1px solid #3c3835", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", animation: "fadeUp 0.25s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#111110", borderBottom: "1px solid #1c1917" }}>
          <button onClick={onClose} className="w-3 h-3 rounded-full cursor-pointer" style={{ background: "#c8502a" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#44403c" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#44403c" }} />
          <span className="ml-3 text-[10px] tracking-widest uppercase" style={{ color: "#57534e" }}>es — terminal</span>
        </div>
        <div className="p-6 space-y-2 min-h-[220px]">
          {TERMINAL_LINES.map(({ prompt, response }, i) => (
            <div key={i}>
              {step > i * 2     && <p style={{ color: "#c8502a" }}>{prompt}</p>}
              {step > i * 2 + 1 && <p style={{ color: "#a8a29e" }}>{response}</p>}
            </div>
          ))}
          {step >= TERMINAL_LINES.length * 2 && (
            <p className="cursor-blink" style={{ color: "#c8502a" }}>&gt;</p>
          )}
        </div>
        <div className="px-6 pb-4">
          <p className="text-[9px] tracking-widest uppercase" style={{ color: "#3c3835" }}>click fuera o ESC para cerrar</p>
        </div>
      </div>
    </div>
  );
};

// ── Roles para el typewriter ───────────────────────────────────────────────
const ROLES = [
  "Ingeniero de Proyectos",
  "Software Developer",
  "HMI / SCADA Engineer",
  "Automatización Industrial",
];

// ── Página principal ──────────────────────────────────────────────────────
export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showProject1, setShowProject1] = useState(false);
  const [showProject2, setShowProject2] = useState(false);
  const [showProject3, setShowProject3] = useState(false);
  const [showProject4, setShowProject4] = useState(false);
  const [showProject5, setShowProject5] = useState(false);

  const [time, setTime] = useState("");
  const [activeSection, setActiveSection] = useState("perfil");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("es-CL", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      });
    setTime(fmt());
    const i = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(i);
  }, []);

  const typewriterText = useTypewriter(ROLES);

  const handleDarkToggle = useCallback(() => {
    document.documentElement.classList.add("theme-transitioning");
    setDarkMode((d) => !d);
    setTimeout(() => document.documentElement.classList.remove("theme-transitioning"), 500);
  }, []);

  const navItems = ["perfil", "experiencia", "formación", "proyectos", "contacto"];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── CSS mínimo: fuentes, keyframes, scrollbar ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Geist+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Outfit', sans-serif; }
        .font-serif  { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-mono   { font-family: 'Geist Mono', monospace; }
        ::selection  { background: #c8502a; color: #fff; }
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: #f2f0eb; }
        ::-webkit-scrollbar-thumb { background: #9a9890; }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn { from { transform:scaleX(0); } to { transform:scaleX(1); } }
        @keyframes blink   { 0%,100% { opacity:1; } 50% { opacity:0; } }
        .animate-fade-up-1 { animation: fadeUp 1s ease 0.2s both; }
        .animate-fade-up-2 { animation: fadeUp 1s ease 0.5s both; }
        .animate-fade-up-3 { animation: fadeUp 1s ease 0.8s both; }
        .animate-scale-in  { animation: scaleIn 1.2s ease 0.5s both; transform-origin: left; }
        .cursor-blink::after { content:''; display:inline-block; width:2px; height:0.85em; background:#c8502a; margin-left:2px; vertical-align:middle; animation:blink 1s step-end infinite; }
        .lang-fill { animation: scaleIn 1.2s ease 0.5s both; transform-origin: left; }
        /* ── Theme transition ──────────────────────────────────────────── */
        .theme-transitioning * { transition: background-color 0.4s ease, color 0.3s ease, border-color 0.4s ease !important; }
        /* ── Dark mode ─────────────────────────────────────────────────── */
        [data-theme="dark"] { background-color: #111110 !important; color-scheme: dark; }
        [data-theme="dark"] [class*="bg-[#f2f0eb]"] { background-color: #111110 !important; }
        [data-theme="dark"] [class*="bg-[#eceae4]"] { background-color: #1a1917 !important; }
        [data-theme="dark"] nav.backdrop-blur-md { background-color: rgba(17,17,16,0.92) !important; border-color: rgba(255,255,255,0.07) !important; }
        [data-theme="dark"] #contacto [class*="bg-[#f2f0eb]"] { background-color: #292524 !important; color: #f2f0eb !important; }
        [data-theme="dark"] .bg-stone-200 { background-color: #292524 !important; }
        [data-theme="dark"] .bg-white { background-color: #1c1917 !important; }
        [data-theme="dark"] button.bg-stone-800 { background-color: #f2f0eb !important; color: #111110 !important; }
        [data-theme="dark"] button.border-stone-800 { border-color: #f2f0eb !important; }
        [data-theme="dark"] .text-stone-800 { color: #f2f0eb !important; }
        [data-theme="dark"] .text-stone-700 { color: #e7e5e4 !important; }
        [data-theme="dark"] .text-stone-600 { color: #d6d3d1 !important; }
        [data-theme="dark"] .text-stone-500 { color: #a8a29e !important; }
        [data-theme="dark"] .text-stone-400 { color: #78716c !important; }
        [data-theme="dark"] .border-stone-200 { border-color: #292524 !important; }
        [data-theme="dark"] .border-stone-300 { border-color: #3c3835 !important; }
        [data-theme="dark"] .divide-stone-200 > * + * { border-color: #292524 !important; }
        [data-theme="dark"] ::-webkit-scrollbar-track { background: #111110; }
        [data-theme="dark"] ::-webkit-scrollbar-thumb { background: #3c3835; }
      `}</style>

      {showEasterEgg && <EasterEgg onClose={() => setShowEasterEgg(false)} />}

      <div data-theme={darkMode ? "dark" : "light"} className="bg-[#f2f0eb] min-h-screen text-stone-800 antialiased">

        {/* ══════════════ NAV ══════════════ */}
        <nav className="fixed top-0 inset-x-0 z-50 bg-[#f2f0eb]/90 backdrop-blur-md border-b border-stone-200/80">
          <div className="max-w-7xl mx-auto px-5 lg:px-16 h-14 flex items-center justify-between gap-4">
            <button
              onClick={() => setShowEasterEgg(true)}
              className="font-mono text-xs tracking-widest text-stone-800 cursor-blink bg-transparent border-none p-0 cursor-pointer hover:text-[#c8502a] transition-colors"
            >ES</button>

            <div className="flex gap-1.5 flex-wrap">
              {navItems.map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer
                    ${activeSection === s
                      ? "bg-stone-800 text-[#f2f0eb] border-stone-800"
                      : "border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-800"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={handleDarkToggle}
                className="font-mono text-[15px] text-stone-400 hover:text-stone-700 transition-colors cursor-pointer bg-transparent border-none p-0 leading-none"
                title={darkMode ? "Modo claro" : "Modo oscuro"}
              >{darkMode ? "☀" : "◑"}</button>
              <span className="font-mono text-[11px] text-stone-400">{time}</span>
            </div>
          </div>
        </nav>

        {/* ══════════════ HERO / PERFIL ══════════════ */}
        <section id="perfil" className="pt-28 pb-20 px-5 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">

            {/* Texto */}
            <div>
              <div className="animate-fade-up-1">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c8502a] mb-4">
                  <span className="cursor-blink">{typewriterText || "\u00A0"}</span>
                  <span className="opacity-60"> · Santiago, Chile</span>
                </p>
                <h1 className="font-serif font-light text-[clamp(3.5rem,8vw,7rem)] leading-[0.92] tracking-tight text-stone-800 mb-8">
                  Eduardo<br />
                  <span className="italic text-stone-500">Schettino</span>
                </h1>
              </div>

              <div className="animate-fade-up-2 h-px bg-stone-200 mb-8" />

              <div className="animate-fade-up-3 max-w-2xl">
                <p className="text-[17px] text-stone-500 leading-relaxed font-light mb-7 text-justify">
                  28 años. Perfil construido en dos etapas —{" "}
                  <strong className="text-stone-700 font-medium">Ingenieria en Automatización y Robótica</strong>, luego{" "}
                  <strong className="text-stone-700 font-medium">Ingeniería en Computación e Informática</strong>.
                  Enfocado en el aprendizaje continuo y la integración de tecnologías industriales y de software.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["HMI / SCADA", "PLC Programming", "Automatización Industrial", "Software Dev"].map((c) => (
                    <Chip key={c} label={c} />
                  ))}
                </div>
              </div>
            </div>

            {/* Foto */}
            <Reveal delay={300}>
              <div className="relative overflow-hidden rounded-[20px] aspect-[3/4] bg-stone-200 shadow-[0_24px_60px_rgba(26,25,22,0.12)]">
                <Image
                  src="/img_6762.jpeg"
                  alt="Eduardo Schettino"
                  fill
                  className="object-cover grayscale-[15%] hover:scale-[1.04] transition-transform duration-700"
                  priority
                />
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-stone-900/60 to-transparent flex items-end p-4">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-stone-300/70 uppercase">
                    Disponible · {new Date().getFullYear()}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════ EXPERIENCIA ══════════════ */}
        <section id="experiencia" className="py-20 px-5 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="flex items-baseline gap-4 mb-12">
                <span className="font-mono text-[11px] text-stone-400">02</span>
                <h2 className="font-serif font-light text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-tight text-stone-800">
                  Experiencia <span className="italic text-stone-500">profesional</span>
                </h2>
              </div>
            </Reveal>
            <div className="h-px bg-stone-200" />

            <Reveal delay={100}>
              <ExpCard
                logo="/sca_logo.jpg"
                company="SCA Ingeniería Ltda."
                role="Ingeniero de Proyectos"
                period="Nov 2024 — Presente"
                description="Participación integral en proyectos de automatización industrial, abarcando desde el ciclo de desarrollo y levantamiento de requerimientos hasta la validación y puesta en marcha de soluciones."
                bullets={[
                  "Programación de equipos Rockwell (PLC Allen-Bradley) en Studio 5000.",
                  "Desarrollo de HMI mediante AVEVA System Platform IDE y FactoryTalk View.",
                  "Ejecución de pruebas de comisionamiento y validación funcional.",
                  "Coordinación técnica y generación de documentación para operación.",
                  "Generación de documentación técnica para soporte y operación",
                  "Coordinación con equipos multidisciplinarios (mantenimiento, ingeniería, clientes)"
                ]}
                chips={["Studio 5000", "AVEVA OMI", "Rockwell", "FactoryTalk", "AVEVA System Platform"]}
              />
            </Reveal>

            <Reveal delay={150}>
              <ExpCard
                logo="/sodimac_chile_logo.jpg"
                company="SODIMAC S.A"
                role="Técnico en Automatización"
                period="May 2020 — Ago 2023"
                description="Colaboración en la implementación de vehículos sin tripulación para la gestión de movimientos y almacenamiento de productos, optimizando la logística de envíos a domicilio."
                bullets={[
                  "Apoyo en proyectos de robótica SBS y FLR con vehículos autonomos.",
                  "Soporte a dos brazos robóticos ABB y sistema de correas/poleas.",
                  "Verificación de cambios ejecutados por desarroladores extranjeros.",
                  "Desarrollo de macros en Excel para monitorear KPIs de rendimiento.",
                ]}
                chips={["Robótica ABB", "Vehiculos no tripulados", "Excel Macros", "KPI"]}
              />
            </Reveal>
          </div>
        </section>

        {/* ══════════════ FORMACIÓN ══════════════ */}
        <section id="formación" className="py-20 px-5 lg:px-16 bg-[#eceae4]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

            {/* Educación + Idiomas */}
            <div>
              <Reveal>
                <div className="flex items-baseline gap-4 mb-10">
                  <span className="font-mono text-[11px] text-stone-400">03</span>
                  <h2 className="font-serif font-light text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-tight text-stone-800">
                    Formación <span className="italic text-stone-500">académica</span>
                  </h2>
                </div>
              </Reveal>

              <Reveal delay={100}>

                {/* Títulos */}
                <div className="divide-y divide-stone-200">
                  {[
                    { title: "Ing. Computación e Informática", period: "2023 — 2025", dim: false },
                    { title: "Ing. Automatización y Robótica", period: "2016 — 2020", dim: false },
                  ].map(({ title, period, dim }) => (
                    <div key={title} className="py-7">
                      <div className="flex justify-between items-baseline mb-1.5">
                        <h3 className={`font-serif text-xl font-normal ${dim ? "text-stone-500" : "text-stone-800"}`}>
                          {title}
                        </h3>
                        <span className="font-mono text-[11px] text-stone-400 tracking-widest">{period}</span>
                      </div>
                      <p className="text-[15px] text-stone-400">Universidad Andrés Bello</p>
                    </div>
                  ))}
                </div>

                {/* Idiomas */}
                <div className="mt-12">
                  <h3 className="font-serif text-lg font-normal text-stone-800 mb-6">Idiomas</h3>
                  <div className="space-y-6">
                    {[
                      { lang: "Inglés", level: "B1 — Técnico", pct: "75%" },
                      { lang: "Español", level: "Nativo", pct: "100%", dim: true },
                    ].map(({ lang, level, pct, dim }) => (
                      <div key={lang}>
                        <div className="flex justify-between text-[15px] mb-2.5">
                          <span className="text-stone-700 font-normal">{lang}</span>
                          <span className="font-mono text-[11px] text-stone-400">{level}</span>
                        </div>
                        <div className="h-px bg-stone-200 relative overflow-hidden rounded">
                          <div
                            className={`lang-fill absolute inset-y-0 left-0 ${dim ? "bg-stone-400" : "bg-stone-700"}`}
                            style={{ width: pct }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Stack + Certificación */}
            <div>
              <Reveal>
                <div className="flex items-baseline gap-4 mb-10">
                  <span className="font-mono text-[11px] text-stone-400 invisible">–</span>
                  <h2 className="font-serif font-light text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-tight text-stone-800">
                    Stack & <span className="italic text-stone-500">cert.</span>
                  </h2>
                </div>
              </Reveal>

              {/* Certificación AVEVA */}
              <Reveal delay={100}>
                <div className="relative border border-stone-200 p-7 mb-7 transition-colors hover:border-stone-400
                  before:content-[''] before:absolute before:-top-px before:-left-px before:w-7 before:h-7
                  before:border-t-2 before:border-l-2 before:border-[#c8502a]">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-20 h-20 shrink-0">
                      <Image src="/Aveva_badge.jpg" alt="AVEVA" fill className="object-contain" />
                    </div>
                    <div>
                      <p className="font-serif text-lg font-normal text-stone-800">System Platform Professional</p>
                      <p className="font-mono text-[9px] tracking-widest text-[#c8502a] mt-1 uppercase">AVEVA Certified</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {["AVEVA™ Operations Management Interface", "AVEVA™ Application Server"].map((item) => (
                      <div key={item} className="flex-1 flex justify-between items-center bg-[#f2f0eb] px-3 py-2 font-mono text-[11px] text-stone-400">
                        <span>{item}</span>
                        <span className="text-[#c8502a]">✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Stack tecnológico */}
              <Reveal delay={200}>
                <div className="divide-y divide-stone-200">
                  {[
                    {
                      label: "PLC / HMI / Control",
                      lines: ["Siemens TIA Portal", "Allen-Bradley", "Lectura de Planos Eléctricos"],
                    },
                    {
                      label: "Software Development",
                      lines: ["React JS", "Backend Essentials", "IBM AI Developer"],
                    },
                    {
                      label: "Plataformas SCADA",
                      lines: ["AVEVA System Platform", "FactoryTalk View", "OMI"],
                    },
                  ].map(({ label, lines }) => (
                    <div key={label} className="py-2">
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-400 mb-2.5">{label}</p>
                      <div className="space-y-1">
                        {lines.map((line) => (
                          <p key={line} className="text-[15px] text-stone-500 leading-relaxed">
                            - {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ══════════════ PROYECTOS ══════════════ */}
        <section id="proyectos" className="py-20 px-5 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="flex items-baseline gap-4 mb-12">
                <span className="font-mono text-[11px] text-stone-400">04</span>
                <h2 className="font-serif font-light text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-tight text-stone-800">
                  Casos de <span className="italic text-stone-500">estudio</span>
                </h2>
              </div>
            </Reveal>
            <div className="h-px bg-stone-200 mb-0.5" />

            <Reveal delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mt-0.5">

                {/* Proyecto activo */}
                <div className="bg-[#eceae4] p-10 min-h-[340px] flex flex-col">
                  <div className="flex justify-between items-start mb-7">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-400">Automatización Industrial</span>
                    <span className="font-mono text-[9px] text-stone-400">2025</span>
                  </div>
                  {!showProject1 ? (
                    <div className="flex flex-col flex-1">
                      <h3 className="font-serif text-[1.9rem] font-normal text-stone-800 leading-tight mb-4 flex-1">
                      Integración de Molino y Despiedrador<br />
                        <span className="italic text-stone-500">Planta de Café de Nestlé - Graneros</span>
                      </h3>
                      <p className="text-[15px] text-stone-500 leading-relaxed font-light mb-6">
                        Integración de sistemas de molienda y despiedrado bajo plataforma ArchestrA e InTouch para optimización operativa.
                      </p>
                      <div className="flex gap-2 mb-7">
                        <Chip label="ArchestrA" /><Chip label="InTouch" /><Chip label="Neat 7" />
                      </div>
                      <button
                        onClick={() => setShowProject1(true)}
                        className="w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        Ver telemetría →
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1" style={{ animation: "fadeUp 0.3s ease" }}>
                      <h3 className="font-serif text-2xl font-normal text-stone-800 mb-6">Detalles del sistema</h3>
                      <div className="flex flex-col gap-4 flex-1">
                        <Bullet text="Programación de lógica Neat 7 para control automático/manual." />
                        <Bullet text="Desarrollo de HMI basado en P&ID para monitoreo en tiempo real." />
                        <Bullet text="Implementación de interlocks de seguridad para equipos vibradores." />
                      </div>
                      <button
                        onClick={() => setShowProject1(false)}
                        className="mt-6 w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        ← Volver
                      </button>
                    </div>
                  )}
                </div>
                <div className="bg-[#eceae4] p-10 min-h-[340px] flex flex-col">
                  <div className="flex justify-between items-start mb-7">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-400">Infraestructura SCADA</span>
                    <span className="font-mono text-[9px] text-stone-400">2025</span>
                  </div>
                  {!showProject2 ? (
                    <div className="flex flex-col flex-1">
                      <h3 className="font-serif text-[1.9rem] font-normal text-stone-800 leading-tight mb-4 flex-1">
                        Migración Servidores SCADA <br />
                        <span className="italic text-stone-500">Planta Cereales y Café - Nestlé</span>
                      </h3>
                      <p className="text-[15px] text-stone-500 leading-relaxed font-light mb-6">
                        Actualización integral de la plataforma de supervisión industrial a la versión AVEVA System Platform 2023 R2.
                      </p>
                      <div className="flex gap-2 mb-7">
                        <Chip label="AVEVA 2023" /><Chip label="InBatch" /><Chip label="Historian" />
                      </div>
                      <button
                        onClick={() => setShowProject2(true)}
                        className="w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        Ver telemetría →
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1" style={{ animation: "fadeUp 0.3s ease" }}>
                      <h3 className="font-serif text-2xl font-normal text-stone-800 mb-6">Detalles del sistema</h3>
                      <div className="flex flex-col gap-4 flex-1">
                        <Bullet text="Virtualización de sistemas de gestión de producción InBatch." />
                        <Bullet text="Validación de integridad de base de datos e históricos." />
                        <Bullet text="Configuración de reportes mediante Batch Management Reporting." />
                      </div>
                      <button
                        onClick={() => setShowProject2(false)}
                        className="mt-6 w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        ← Volver
                      </button>
                    </div>
                  )}
                </div>
                <div className="bg-[#eceae4] p-10 min-h-[340px] flex flex-col">
                  <div className="flex justify-between items-start mb-7">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-400">Control de Procesos</span>
                    <span className="font-mono text-[9px] text-stone-400">2025</span>
                  </div>
                  {!showProject3 ? (
                    <div className="flex flex-col flex-1">
                      <h3 className="font-serif text-[1.9rem] font-normal text-stone-800 leading-tight mb-4 flex-1">
                        Tratamiento CHE<br />
                        <span className="italic text-stone-500">Planta Cereales | Área de Hidrólisis - Nestlé</span>
                      </h3>
                      <p className="text-[15px] text-stone-500 leading-relaxed font-light mb-6">
                        Integración de instrumentación  y desarrollo de algoritmos para el cálculo de residencia de producto.
                      </p>
                      <div className="flex gap-2 mb-7">
                        <Chip label="LOGIX 5000" /><Chip label="IO-Link" /><Chip label="Aveva" /><Chip label="System Platform" />
                      </div>
                      <button
                        onClick={() => setShowProject3(true)}
                        className="w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        Ver telemetría →
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1" style={{ animation: "fadeUp 0.3s ease" }}>
                      <h3 className="font-serif text-2xl font-normal text-stone-800 mb-6">Detalles del sistema</h3>
                      <div className="flex flex-col gap-4 flex-1">
                        <Bullet text="Integración de sensores de temperatura y presion mediante protocolo IO-Link." />
                        <Bullet text="Creación de objetos en Galaxy para monitoreo de variables críticas." />
                        <Bullet text="Implementación de lógica para cálculo dinámico de tiempo de residencia." />
                      </div>
                      <button
                        onClick={() => setShowProject3(false)}
                        className="mt-6 w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        ← Volver
                      </button>
                    </div>
                  )}
                </div>
                <div className="bg-[#eceae4] p-10 min-h-[340px] flex flex-col">
                  <div className="flex justify-between items-start mb-7">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-400">Optimización</span>
                    <span className="font-mono text-[9px] text-stone-400">2025</span>
                  </div>
                  {!showProject4 ? (
                    <div className="flex flex-col flex-1">
                      <h3 className="font-serif text-[1.9rem] font-normal text-stone-800 leading-tight mb-4 flex-1">
                        Tiempos Perdidos<br />
                        <span className="italic text-stone-500">Agrosuper Lo Miranda</span>
                      </h3>
                      <p className="text-[15px] text-stone-500 leading-relaxed font-light mb-6">
                        Mejora del sistema de control de rutas y gestión de cambio de dieta para minimizar tiempos muertos en Línea 5.
                      </p>
                      <div className="flex gap-2 mb-7">
                        <Chip label="Logix 5000" /><Chip label="ROCKWELL" /><Chip label="IGNITION AUTOMATION" />
                      </div>
                      <button
                        onClick={() => setShowProject4(true)}
                        className="w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        Ver telemetría →
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1" style={{ animation: "fadeUp 0.3s ease" }}>
                      <h3 className="font-serif text-2xl font-normal text-stone-800 mb-6">Detalles del sistema</h3>
                      <div className="flex flex-col gap-4 flex-1">
                        <Bullet text="Lógica de borrado y carga de OT para cámaras de enfriador." />
                        <Bullet text="Automatización del direccionamiento basado en tablas de ingredientes." />
                        <Bullet text="Sistema de registro automático de razones de detención (PopUp)." />
                      </div>
                      <button
                        onClick={() => setShowProject4(false)}
                        className="mt-6 w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        ← Volver
                      </button>
                    </div>
                  )}
                </div>
                <div className="bg-[#eceae4] p-10 min-h-[340px] flex flex-col">
                  <div className="flex justify-between items-start mb-7">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-400">Sistemas Batch</span>
                    <span className="font-mono text-[9px] text-stone-400">2025</span>
                  </div>
                  {!showProject5 ? (
                    <div className="flex flex-col flex-1">
                      <h3 className="font-serif text-[1.9rem] font-normal text-stone-800 leading-tight mb-4 flex-1">
                        HMI MasterChef<br />
                        <span className="italic text-stone-500">Purina Teno</span>
                      </h3>
                      <p className="text-[15px] text-stone-500 leading-relaxed font-light mb-6">
                        Desarrollo de interfaz avanzada para el control de dosificación y supervisión de unidades de proceso por lotes.
                      </p>
                      <div className="flex gap-2 mb-7">
                        <Chip label="MasterChef" /><Chip label="Batch Control" /><Chip label="HMI Design" />
                      </div>
                      <button
                        onClick={() => setShowProject5(true)}
                        className="w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        Ver telemetría →
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1" style={{ animation: "fadeUp 0.3s ease" }}>
                      <h3 className="font-serif text-2xl font-normal text-stone-800 mb-6">Detalles del sistema</h3>
                      <div className="flex flex-col gap-4 flex-1">
                        <Bullet text="Gestión dinámica de recetas y control de agenda de producción." />
                        <Bullet text="Monitoreo de precisión con algoritmos de control de tolerancia." />
                        <Bullet text="Visualización de unidades mediante diagramas de secuencia interactivos." />
                      </div>
                      <button
                        onClick={() => setShowProject5(false)}
                        className="mt-6 w-fit font-mono text-[10px] tracking-widest uppercase border border-stone-300 text-stone-500 px-4 py-2 rounded-sm hover:border-stone-600 hover:text-stone-700 transition-all cursor-pointer"
                      >
                        ← Volver
                      </button>
                    </div>
                  )}
                </div>
                {/* Placeholder */}
                {/*
                <div className="bg-[#eceae4] p-10 min-h-[340px] flex flex-col justify-end opacity-35 border border-dashed border-stone-300">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-400 block mb-3">Próximamente</span>
                  <h3 className="font-serif text-[1.8rem] font-light text-stone-400">Nuevo proyecto</h3>
                </div>
                */}

              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════ CONTACTO ══════════════ */}
        <section id="contacto" className="py-20 px-5 lg:px-16 bg-stone-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

            {/* Formulario de contacto */}
            <Reveal>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c8502a] block mb-4">
                  05 — Contacto
                </p>
                <h2 className="font-serif font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-[#f2f0eb] mb-7">
                  ¿Hablamos?
                </h2>
                <p className="text-[16px] text-stone-400 leading-relaxed font-light mb-10 max-w-sm">
                  Disponible para proyectos de automatización, consultoría técnica y oportunidades de colaboración.
                </p>

                {!showContact ? (
                  <button
                    onClick={() => setShowContact(true)}
                    className="w-full bg-[#f2f0eb] text-stone-800 font-medium text-sm py-3.5 px-8 rounded-sm hover:bg-[#c8502a] hover:text-white transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    Ver datos de contacto
                  </button>
                ) : (
                  <div style={{ animation: "fadeUp 0.3s ease" }}>
                    <div className="border-t border-white/10 pt-6 mb-6">
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#c8502a] mb-2.5">Email</p>
                      <p className="text-[16px] text-[#f2f0eb] select-all font-normal">e_schettino@icloud.com</p>
                    </div>
                    <div className="border-t border-white/10 pt-6 mb-8">
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#c8502a] mb-2.5">Teléfono</p>
                      <p className="text-[16px] text-[#f2f0eb] select-all font-normal">+56 9 8889 5490</p>
                    </div>
                    <button
                      onClick={() => setShowContact(false)}
                      className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-600 hover:text-stone-400 transition-colors cursor-pointer bg-transparent border-none"
                    >
                      Ocultar
                    </button>
                  </div>
                )}
              </div>
            </Reveal>

            {/* Links */}
            <Reveal delay={150}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone-600 block mb-10">
                  Recursos
                </p>
                <div>
                  {[
                    { label: "LinkedIn Profile", href: "#", arrow: "↗", accent: false },
                    { label: "GitHub Repos", href: "#", arrow: "↗", accent: false },
                    { label: "Descargar CV.pdf", href: "/tu-cv.pdf", arrow: "↓", accent: true, download: true },
                  ].map(({ label, href, arrow, accent, download }) => (
                    <a
                      key={label}
                      href={href}
                      target={download ? undefined : "_blank"}
                      download={download}
                      className={`group flex justify-between items-center py-5 border-b border-white/8 text-sm font-normal transition-colors duration-200 no-underline
                        ${accent ? "text-[#c8502a]" : "text-stone-500 hover:text-[#f2f0eb]"}`}
                    >
                      <span>{label}</span>
                      <span className="text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                        {arrow}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ══════════════ FOOTER ══════════════ */}
        <footer className="bg-stone-900 border-t border-white/5 py-5 px-5 lg:px-16">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-mono text-[10px] tracking-widest text-stone-100">
              © {new Date().getFullYear()} Eduardo Schettino
            </span>
            <span className="font-mono text-[10px] tracking-widest text-stone-100">
              Santiago, Chile
            </span>
          </div>
        </footer>

      </div>
    </>
  );
}
