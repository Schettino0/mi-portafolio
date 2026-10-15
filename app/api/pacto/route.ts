import { guardarFirma } from "./almacen";
import { crearPermiso } from "./permiso";

// Guarda las firmas del "pacto de sangre" de la invitación de Halloween (/invitacion).
// Responde rápido y entrega un permiso de un solo uso para pedir la voz en /api/pacto/voz
// (así la espera de ElevenLabs no hace que esta función se pase del tiempo límite).

export const dynamic = "force-dynamic";

function limpiar(nombre: unknown): string {
  if (typeof nombre !== "string") return "";
  return nombre
    .replace(/[\u0000-\u001f<>\[\]{}]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
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
    await guardarFirma(key, { nombre, fecha });
  } catch (e) {
    console.error("pacto: no se pudo guardar", e);
    return Response.json({ ok: false, error: "No se pudo guardar" }, { status: 500 });
  }

  return Response.json({ ok: true, voz: crearPermiso(nombre) });
}
