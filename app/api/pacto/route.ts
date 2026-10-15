import { getStore } from "@netlify/blobs";

// Guarda las firmas del "pacto de sangre" de la invitación de Halloween (/invitacion).
// Cada firma es un registro en el almacén "pacto-halloween" de Netlify Blobs.

export const dynamic = "force-dynamic";

const store = () => getStore({ name: "pacto-halloween", consistency: "strong" });

function limpiar(nombre: unknown): string {
  if (typeof nombre !== "string") return "";
  return nombre.replace(/[\u0000-\u001f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 40);
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
    await store().setJSON(key, { nombre, fecha });
  } catch (e) {
    console.error("pacto: no se pudo guardar", e);
    return Response.json({ ok: false, error: "No se pudo guardar" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
