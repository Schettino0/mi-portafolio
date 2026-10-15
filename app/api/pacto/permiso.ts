import { createHmac, timingSafeEqual } from "node:crypto";

// Permiso firmado para pedir la voz de una firma: nombre + vencimiento (2 minutos).
// Evita que alguien use /api/pacto/voz para gastar créditos de ElevenLabs sin firmar.

export function crearPermiso(nombre: string): string | null {
  const secreto = process.env.ELEVENLABS_API_KEY;
  if (!secreto || !process.env.ELEVENLABS_VOICE_ID) return null;
  const datos = Buffer.from(JSON.stringify({ n: nombre, e: Date.now() + 120_000 })).toString("base64url");
  const firma = createHmac("sha256", secreto).update(datos).digest("base64url");
  return `${datos}.${firma}`;
}

export function leerPermiso(permiso: unknown): string | null {
  const secreto = process.env.ELEVENLABS_API_KEY;
  if (!secreto || typeof permiso !== "string") return null;
  const [datos, firma] = permiso.split(".");
  if (!datos || !firma) return null;
  const esperada = createHmac("sha256", secreto).update(datos).digest();
  const recibida = Buffer.from(firma, "base64url");
  if (recibida.length !== esperada.length || !timingSafeEqual(recibida, esperada)) return null;
  try {
    const { n, e } = JSON.parse(Buffer.from(datos, "base64url").toString());
    if (typeof n !== "string" || typeof e !== "number" || Date.now() > e) return null;
    return n;
  } catch {
    return null;
  }
}
