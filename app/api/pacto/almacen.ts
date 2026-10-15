import { getStore } from "@netlify/blobs";

// Almacén de firmas del pacto.
// En Netlify usa Netlify Blobs. En local (npm run dev), Netlify Blobs no está
// disponible, así que cae a un almacén en memoria que se borra al reiniciar.

type Firma = { nombre: string; fecha: string };

const memoria = new Map<string, Firma>();
let avisado = false;

function sinNetlify(e: unknown): boolean {
  const err = e as { name?: string; message?: string };
  return (
    err?.name === "MissingBlobsEnvironmentError" ||
    /environment has not been configured|MissingBlobsEnvironment/i.test(err?.message ?? "")
  );
}

function usarMemoria() {
  if (!avisado) {
    console.warn("pacto: Netlify Blobs no disponible, usando memoria (modo local)");
    avisado = true;
  }
}

const store = () => getStore({ name: "pacto-halloween", consistency: "strong" });

export async function guardarFirma(key: string, firma: Firma) {
  try {
    await store().setJSON(key, firma);
  } catch (e) {
    if (!sinNetlify(e)) throw e;
    usarMemoria();
    memoria.set(key, firma);
  }
}

export async function listarFirmas(): Promise<(Firma & { id: string })[]> {
  let lista: (Firma & { id: string })[];
  try {
    const s = store();
    const { blobs } = await s.list();
    const firmas = await Promise.all(
      blobs.map(async ({ key }) => {
        const f = (await s.get(key, { type: "json" })) as Firma | null;
        return f ? { id: key, ...f } : null;
      }),
    );
    lista = firmas.filter((f): f is Firma & { id: string } => f !== null);
  } catch (e) {
    if (!sinNetlify(e)) throw e;
    usarMemoria();
    lista = [...memoria.entries()].map(([id, f]) => ({ id, ...f }));
  }
  return lista.sort((a, b) => a.fecha.localeCompare(b.fecha));
}

export async function borrarFirma(key: string) {
  try {
    await store().delete(key);
  } catch (e) {
    if (!sinNetlify(e)) throw e;
    usarMemoria();
    memoria.delete(key);
  }
}
