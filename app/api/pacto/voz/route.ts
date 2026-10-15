import { leerPermiso } from "../permiso";

// Genera la voz tenebrosa con el nombre del invitado usando ElevenLabs (Eleven v4).
// Usa el endpoint de streaming: el audio empieza a llegar en ~1 s, así la función
// no se pasa del tiempo límite de Netlify esperando el audio completo.
// Variables de entorno: ELEVENLABS_API_KEY y ELEVENLABS_VOICE_ID.

export const dynamic = "force-dynamic";

// Frases con audio tags de Eleven v4. {n} se reemplaza por el nombre.
const FRASES = [
  "[low threatening, booming, slowly] Muajajajaja… [laughs] ¡MUAJAJAJAJAJA! [long pause] [whispers] {n}… [pause] [low threatening] tu alma… ya es nuestra. [barely audible] …para siempre.",
  "[booming, drawn out] Muuuajajajaja… [laughs] [long pause] [hushed] {n}… firmaste con sangre… [pause] [low threatening] y la sangre no se borra.",
  "[low threatening] Mua… ja… ja… [laughs] ¡MUAJAJAJAJA! [long pause] [whispers, slowly] Bienvenido a la familia, {n}. [pause] Ya no hay vuelta atrás…",
];

export async function POST(req: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (!apiKey || !voiceId) {
    return Response.json({ ok: false, error: "Faltan ELEVENLABS_API_KEY o ELEVENLABS_VOICE_ID" }, { status: 503 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {}
  const nombre = leerPermiso(body.permiso);
  if (!nombre) {
    return Response.json({ ok: false, error: "Permiso inválido o vencido" }, { status: 403 });
  }

  const texto = FRASES[Math.floor(Math.random() * FRASES.length)].replace("{n}", nombre);
  const t0 = Date.now();
  let res: Response;
  try {
    res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}/stream?output_format=mp3_44100_64`,
      {
        method: "POST",
        headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
        body: JSON.stringify({ text: texto, model_id: "eleven_v4" }),
      },
    );
  } catch (e) {
    console.error("pacto/voz: no se pudo conectar con ElevenLabs", e);
    return Response.json({ ok: false, error: "No se pudo conectar con ElevenLabs" }, { status: 502 });
  }

  if (!res.ok || !res.body) {
    const detalle = (await res.text().catch(() => "")).slice(0, 300);
    console.error("pacto/voz: ElevenLabs respondió", res.status, detalle);
    return Response.json(
      { ok: false, error: `ElevenLabs respondió ${res.status}`, detalle },
      { status: 502 },
    );
  }

  console.log(`pacto/voz: audio empezó a llegar en ${Date.now() - t0} ms`);
  return new Response(res.body, {
    headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
  });
}
