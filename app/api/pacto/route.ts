import { getStore } from "@netlify/blobs";

// Guarda las firmas del "pacto de sangre" de la invitación de Halloween (/invitacion).
// Cada firma es un registro en el almacén "pacto-halloween" de Netlify Blobs.
// Además genera una voz tenebrosa con el nombre usando ElevenLabs (Eleven v4).
// Variables de entorno en Netlify: ELEVENLABS_API_KEY y ELEVENLABS_VOICE_ID.

export const dynamic = "force-dynamic";

const firmas = () => getStore({ name: "pacto-halloween", consistency: "strong" });
const voces = () => getStore({ name: "pacto-voces" });

function limpiar(nombre: unknown): string {
  if (typeof nombre !== "string") return "";
  return nombre
    .replace(/[\u0000-\u001f<>\[\]{}]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

// Frases con audio tags de Eleven v4. {n} se reemplaza por el nombre.
const FRASES = [
  "[low threatening, booming, slowly] Muajajajaja… [laughs] ¡MUAJAJAJAJAJA! [long pause] [whispers] {n}… [pause] [low threatening] tu alma… ya es nuestra. [barely audible] …para siempre.",
  "[booming, drawn out] Muuuajajajaja… [laughs] [long pause] [hushed] {n}… firmaste con sangre… [pause] [low threatening] y la sangre no se borra.",
  "[low threatening] Mua… ja… ja… [laughs] ¡MUAJAJAJAJA! [long pause] [whispers, slowly] Bienvenido a la familia, {n}. [pause] Ya no hay vuelta atrás…",
];

async function generarVoz(nombre: string): Promise<string | null> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  if (!apiKey || !voiceId) return null;

  // Reutiliza el audio si ese nombre ya firmó antes (ahorra créditos)
  const clave = "v2:" + nombre.toLowerCase();
  try {
    const guardado = await voces().get(clave, { type: "arrayBuffer" });
    if (guardado) return Buffer.from(guardado).toString("base64");
  } catch {}

  const texto = FRASES[Math.floor(Math.random() * FRASES.length)].replace("{n}", nombre);
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_64`,
    {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body: JSON.stringify({ text: texto, model_id: "eleven_v4" }),
      signal: AbortSignal.timeout(20000),
    },
  );
  if (!res.ok) {
    console.error("pacto: ElevenLabs respondió", res.status, await res.text().catch(() => ""));
    return null;
  }
  const audio = await res.arrayBuffer();
  try {
    await voces().set(clave, audio);
  } catch {}
  return Buffer.from(audio).toString("base64");
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  // Trampa para bots: un humano nunca llena este campo
  if (body.bot) return Response.json({ ok: true });

  const nombre = limpiar(body.nombre);
  if (nombre.length < 2) {
    return Response.json({ ok: false, error: "Falta el nombre" }, { status: 400 });
  }

  const fecha = new Date().toISOString();
  const key = `${fecha}_${Math.random().toString(36).slice(2, 8)}`;
  try {
    await firmas().setJSON(key, { nombre, fecha });
  } catch (e) {
    console.error("pacto: no se pudo guardar", e);
    return Response.json({ ok: false, error: "No se pudo guardar" }, { status: 500 });
  }

  // La voz es un extra: si falla, la firma igual queda guardada
  let audio: string | null = null;
  try {
    audio = await generarVoz(nombre);
  } catch (e) {
    console.error("pacto: no se pudo generar la voz", e);
  }

  return Response.json({ ok: true, audio });
}
