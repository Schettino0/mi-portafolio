export default function Home() {
  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        body { font-family: var(--font-sans), sans-serif; }
        .font-serif { font-family: var(--font-serif), Georgia, serif; }
        .font-mono  { font-family: var(--font-mono), monospace; }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        .cursor-blink::after { content:''; display:inline-block; width:2px; height:0.85em; background:#c8502a; margin-left:2px; vertical-align:middle; animation:blink 1s step-end infinite; }
      `}</style>

      <div className="min-h-screen flex items-center justify-center px-6 text-center" style={{ background: "#111110", color: "#f2f0eb" }}>
        <div className="max-w-lg">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: "#78716c" }}>
            Eduardo Schettino
          </p>

          <h1 className="font-serif font-light text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-tight mb-6">
            Sitio en <span className="italic" style={{ color: "#c8502a" }}>construcción</span>
          </h1>

          <p className="text-[16px] leading-relaxed mb-10" style={{ color: "#a8a29e" }}>
            Estoy actualizando mi portafolio. Vuelve pronto, o mientras tanto contáctame en LinkedIn.
          </p>

          <a
            href="https://www.linkedin.com/in/eduardoschettinosanhueza/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-[12px] tracking-widest uppercase px-7 py-3.5 no-underline transition-all duration-200"
            style={{ background: "#f2f0eb", color: "#111110" }}
          >
            Ver LinkedIn ↗
          </a>

          <p className="font-mono text-[10px] tracking-widest uppercase mt-12 cursor-blink" style={{ color: "#3c3835" }}>
            Santiago, Chile
          </p>
        </div>
      </div>
    </>
  );
}
