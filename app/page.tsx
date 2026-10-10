"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const formatClock = (d: Date) => `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} · ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

type Project = { number: string; area: string; title: string; client: string; summary: string; tags: string[]; details: string[] };

const projects: Project[] = [
  { number: "01", area: "Automatización industrial", title: "Integración de Molino y Despiedrador", client: "Planta de Café de Nestlé · Graneros", summary: "Integración de sistemas de molienda y despiedrado bajo plataforma ArchestrA e InTouch para optimización operativa.", tags: ["ArchestrA", "InTouch", "Neat 7"], details: ["Programación de lógica Neat 7 para control automático/manual.", "Desarrollo de HMI basado en P&ID para monitoreo en tiempo real.", "Implementación de interlocks de seguridad para equipos vibradores."] },
  { number: "02", area: "Infraestructura SCADA", title: "Migración Servidores SCADA", client: "Planta Cereales y Café · Nestlé", summary: "Actualización integral de la plataforma de supervisión industrial a la versión AVEVA System Platform 2023 R2.", tags: ["AVEVA 2023", "InBatch", "Historian"], details: ["Virtualización de sistemas de gestión de producción InBatch.", "Validación de integridad de base de datos e históricos.", "Configuración de reportes mediante Batch Management Reporting."] },
  { number: "03", area: "Control de procesos", title: "Tratamiento CHE", client: "Planta Cereales · Área de Hidrólisis · Nestlé", summary: "Integración de instrumentación y desarrollo de algoritmos para el cálculo de residencia de producto.", tags: ["LOGIX 5000", "IO-Link", "Aveva", "System Platform"], details: ["Integración de sensores de temperatura y presión mediante protocolo IO-Link.", "Creación de objetos en Galaxy para monitoreo de variables críticas.", "Implementación de lógica para cálculo dinámico de tiempo de residencia."] },
  { number: "04", area: "Optimización", title: "Tiempos Perdidos", client: "Agrosuper · Lo Miranda", summary: "Mejora del sistema de control de rutas y gestión de cambio de dieta para minimizar tiempos muertos en Línea 5.", tags: ["Logix 5000", "Rockwell", "Ignition Automation"], details: ["Lógica de borrado y carga de OT para cámaras de enfriador.", "Automatización del direccionamiento basado en tablas de ingredientes.", "Sistema de registro automático de razones de detención (PopUp)."] },
  { number: "05", area: "Sistemas batch", title: "HMI MasterChef", client: "Purina · Teno", summary: "Desarrollo de interfaz avanzada para el control de dosificación y supervisión de unidades de proceso por lotes.", tags: ["MasterChef", "Batch Control", "HMI Design"], details: ["Gestión dinámica de recetas y control de agenda de producción.", "Monitoreo de precisión con algoritmos de control de tolerancia.", "Visualización de unidades mediante diagramas de secuencia interactivos."] },
];

const themes = [
  { id: "editorial", name: "Editorial", note: "Original", colors: ["#f2f0e9", "#142a37", "#d7f157"] },
  { id: "midnight", name: "Midnight", note: "Dark mode", colors: ["#07131d", "#86b5ff", "#b5f855"] },
  { id: "stark", name: "Stark", note: "Rojo + oro", colors: ["#f6eee4", "#a82524", "#f6c344"] },
  { id: "tesseract", name: "Tesseract", note: "Azul cósmico", colors: ["#07142d", "#708fff", "#27d9eb"] },
  { id: "wakanda", name: "Wakanda", note: "Violeta eléctrico", colors: ["#170d28", "#b573e3", "#e190ff"] },
];

const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "experiencia", label: "Experiencia" },
  { id: "formacion", label: "Formación" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

const stack = ["Allen-Bradley", "Studio 5000", "AVEVA System Platform", "FactoryTalk View", "Siemens TIA Portal", "Ignition", "React JS"];

const Arrow = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 4l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>;
const Dot = () => <span className="signal-dot" aria-hidden="true" />;

export default function Home() {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [theme, setTheme] = useState("stark");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    const kick = setTimeout(update, 0);
    const id = setInterval(update, 1000 * 30);
    return () => { clearTimeout(kick); clearInterval(id); };
  }, []);

  return <main data-theme={theme}>
    <header className="nav">
      <div className="nav-inner">
        <a className="monogram" href="#inicio" aria-label="Ir al inicio">ES<span>.</span></a>
        <nav aria-label="Navegación principal" className={menuOpen ? "is-open" : ""}>
          {navItems.map((item, index) => <a href={`#${item.id}`} key={item.id} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{item.label}</a>)}
        </nav>
        <div className="nav-status"><Dot /><span>Contacto abierto</span>{now && <span className="nav-clock">{formatClock(now)}</span>}</div>
        <button className="nav-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}><span /><span /><span /></button>
      </div>
    </header>

    <section id="inicio" className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow"><span>Ingeniería de proyectos</span> · Automatización & software</p>
        <h1>Eduardo<br /><em>Schettino</em></h1>
        <div className="hero-intro">
          <p>Perfil construido en dos etapas: Ingeniería en Automatización y Robótica, luego Ingeniería en Computación e Informática.</p>
          <p>Enfocado en el aprendizaje continuo y la integración de tecnologías industriales y de software.</p>
        </div>
        <div className="hero-actions">
          <a className="btn btn-solid" href="#proyectos">Explorar proyectos <Arrow /></a>
          <a className="btn btn-ghost" href="#contacto">Contacto</a>
        </div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait"><Image src="/IMG_6762.JPEG" alt="Eduardo Schettino" fill priority sizes="320px" /></div>
        <p className="portrait-note"><Dot /> Abierto a contacto profesional</p>
      </div>
    </section>

    <div className="strip" aria-label="Tecnologías">
      <div className="strip-inner">{stack.map((item) => <span key={item}>{item}</span>)}</div>
    </div>

    <section id="experiencia" className="block wrap">
      <SectionHeading number="02" label="Trayectoria" title={<>Experiencia <em>profesional</em></>} />
      <div className="experience-grid">
        <Experience company="SCA Ingeniería Ltda." period="Nov 2024 — Presente" role="Ingeniero de Proyectos" logo="/SCA_logo.jpg" description="Participación integral en proyectos de automatización industrial, desde el levantamiento de requerimientos hasta la validación y puesta en marcha." skills={["Programación de equipos Rockwell (PLC Allen-Bradley) en Studio 5000.", "Desarrollo de HMI mediante AVEVA System Platform IDE y FactoryTalk View.", "Ejecución de pruebas de comisionamiento y validación funcional.", "Coordinación técnica, documentación para operación y soporte."]} />
        <Experience company="SODIMAC S.A" period="May 2020 — Ago 2023" role="Técnico en Automatización" logo="/sodimac_chile_logo.jpg" description="Colaboración en la implementación de vehículos sin tripulación para movimientos, almacenamiento de productos y logística de envíos a domicilio." skills={["Apoyo en proyectos de robótica SBS y FLR con vehículos autónomos.", "Soporte a dos brazos robóticos ABB y sistema de correas/poleas.", "Verificación de cambios ejecutados por desarrolladores extranjeros.", "Desarrollo de macros en Excel para monitorear KPIs de rendimiento."]} />
      </div>
    </section>

    <section id="formacion" className="band">
      <div className="wrap band-inner">
        <SectionHeading number="03" label="Base técnica" title={<>Formación & <em>herramientas</em></>} />
        <div className="education-grid">
          <div className="edu-col">
            <p className="block-label">Formación académica</p>
            <div className="degree"><span>2023 — 2025</span><div><h3>Ing. Computación e Informática</h3><p>Universidad Andrés Bello</p></div></div>
            <div className="degree"><span>2016 — 2020</span><div><h3>Ing. Automatización y Robótica</h3><p>Universidad Andrés Bello</p></div></div>
            <p className="block-label">Idiomas</p>
            <div className="language"><div><span>Español</span><small>Nativo</small></div><i style={{ width: "100%" }} /></div>
            <div className="language"><div><span>Inglés</span><small>B1 — Técnico</small></div><i style={{ width: "75%" }} /></div>
          </div>
          <div className="edu-col">
            <div className="certificate"><Image src="/Aveva_badge.jpg" alt="Certificación AVEVA" width={88} height={88} /><div><p className="block-label">Certificación</p><h3>System Platform Professional</h3><span>AVEVA Certified</span></div></div>
            <ToolGroup title="PLC / HMI / Control" items={["Siemens TIA Portal", "Allen-Bradley", "Lectura de Planos Eléctricos"]} />
          </div>
          <div className="edu-col">
            <ToolGroup title="Software Development" items={["React JS", "Backend Essentials", "IBM AI Developer"]} />
            <ToolGroup title="Plataformas SCADA" items={["AVEVA System Platform", "FactoryTalk View", "OMI"]} />
          </div>
        </div>
      </div>
    </section>

    <section id="proyectos" className="block wrap">
      <SectionHeading number="04" label="Selección" title={<>Casos de <em>estudio</em></>} />
      <div className="project-grid">
        {projects.map((project) => {
          const open = openProject === project.number;
          return <article className={`project ${open ? "is-open" : ""}`} key={project.number}>
            <div className="project-top"><span className="project-number">{project.number}</span><span className="project-area">{project.area}</span></div>
            <h3>{project.title}</h3>
            <p className="project-client">{project.client}</p>
            <p className="project-summary">{project.summary}</p>
            <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="project-more"><div><ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></div>
            <button className="project-toggle" onClick={() => setOpenProject(open ? null : project.number)} aria-expanded={open}>{open ? "Ocultar detalle" : "Ver detalle"} <span aria-hidden="true">{open ? "−" : "+"}</span></button>
          </article>;
        })}
        <a className="project project-cta" href="#contacto">
          <span className="project-area">¿Tienes un proyecto?</span>
          <h3>Conversemos sobre lo próximo</h3>
          <span className="btn btn-solid">Ir a contacto <Arrow /></span>
        </a>
      </div>
    </section>

    <section id="contacto" className="contact">
      <div className="wrap contact-inner">
        <div className="contact-grid">
          <div>
            <p className="eyebrow">05 · Contacto</p>
            <h2>¿Hablamos de<br /><em>lo próximo?</em></h2>
          </div>
          <div className="contact-side">
            <p>¿Tienes un proyecto de automatización, una consulta técnica o alguna idea de colaboración? Aquí están mis datos de contacto.</p>
            {contactOpen
              ? <div className="contact-data"><a href="mailto:e_schettino@icloud.com">e_schettino@icloud.com</a><a href="tel:+56988895490">+56 9 8889 5490</a></div>
              : <button className="btn btn-dark" onClick={() => setContactOpen(true)}>Ver datos de contacto <Arrow /></button>}
          </div>
        </div>
        <footer><span>© {new Date().getFullYear()} Eduardo Schettino</span><span>Ingeniería de Proyectos</span></footer>
      </div>
    </section>

    <div className={`theme-picker ${themeMenuOpen ? "is-open" : ""}`}>
      <div id="theme-options" className="theme-options" aria-label="Paletas de color">
        <p>Paletas / prueba</p>
        {themes.map((option) => <button key={option.id} className={theme === option.id ? "is-active" : ""} onClick={() => setTheme(option.id)} aria-pressed={theme === option.id}><span className="theme-swatches">{option.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}</span><span><b>{option.name}</b><small>{option.note}</small></span><em>{theme === option.id ? "✓" : ""}</em></button>)}
      </div>
      <button className="theme-trigger" onClick={() => setThemeMenuOpen((open) => !open)} aria-expanded={themeMenuOpen} aria-controls="theme-options"><span className="theme-trigger-dots"><i /><i /><i /></span><span className="theme-label">Paleta</span></button>
    </div>
  </main>;
}

function SectionHeading({ number, label, title }: { number: string; label: string; title: React.ReactNode }) {
  return <div className="sec-head"><span className="sec-num" aria-hidden="true">{number}</span><div><p className="eyebrow">{label}</p><h2>{title}</h2></div></div>;
}

function ToolGroup({ title, items }: { title: string; items: string[] }) {
  return <div className="tool-group"><p className="block-label">{title}</p>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function Experience({ company, period, role, logo, description, skills }: { company: string; period: string; role: string; logo: string; description: string; skills: string[] }) {
  return <article className="experience">
    <div className="experience-head">
      <Image src={logo} alt="" width={52} height={52} />
      <div><h3>{company}</h3><p>{role}</p></div>
      <span className="experience-period">{period}</span>
    </div>
    <p className="experience-desc">{description}</p>
    <ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
  </article>;
}
