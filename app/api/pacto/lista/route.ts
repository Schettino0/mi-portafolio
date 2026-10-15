import { getStore } from "@netlify/blobs";
import { createHash, timingSafeEqual } from "node:crypto";

// Lista privada de confirmados para /invitacion/lista.
// Requiere la variable de entorno INVITACION_CLAVE configurada en Netlify.

export const dynamic = "force-dynamic";

type Firma = { nombre: string; fecha: string };

function claveValida(clave: unknown): boolean {
  const real = process.env.INVITACION_CLAVE;
  if (!real || typeof clave !== "string") return false;
  const a = createHash("sha256").update(clave).digest();
  const b = createHash("sha256").update(real).digest();
  return timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  if (!process.env.INVITACION_CLAVE) {
    return Response.json(
      { ok: false, error: "Falta configurar INVITACION_CLAVE en Netlify." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  if (!claveValida(body.clave)) {
    await new Promise((r) => setTimeout(r, 600));
    return Response.json({ ok: false, error: "Clave incorrecta" }, { status: 401 });
  }

  const store = getStore({ name: "pacto-halloween", consistency: "strong" });

  if (typeof body.borrar === "string" && body.borrar) {
    await store.delete(body.borrar);
  }

  const { blobs } = await store.list();
  const firmas = await Promise.all(
    blobs.map(async ({ key }) => {
      const f = (await store.get(key, { type: "json" })) as Firma | null;
      return f ? { id: key, ...f } : null;
    }),
  );

  const lista = firmas
    .filter((f): f is Firma & { id: string } => f !== null)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  return Response.json({ ok: true, firmas: lista });
}
