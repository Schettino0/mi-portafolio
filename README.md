# Mi Portafolio — Eduardo Schettino

Sitio personal / portafolio de Eduardo Schettino, construido con Next.js. Presenta perfil, experiencia profesional, formación académica, stack técnico/certificaciones, proyectos y contacto.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el sitio. La página se actualiza automáticamente al editar `app/page.tsx`.

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — sirve el build de producción
- `npm run lint` — linting con ESLint

## Estructura

```
app/
  layout.tsx    # layout raíz
  page.tsx      # página principal (perfil, experiencia, formación, proyectos, contacto)
  globals.css   # estilos globales
public/         # imágenes y assets estáticos
```

## Historial de versiones

### v1 — Versión inicial

Primera versión funcional del portafolio: perfil, experiencia, formación, stack/certificaciones, proyectos y contacto, con modo claro/oscuro y animaciones al hacer scroll. El texto de cuerpo era pequeño (13–15px) y de bajo contraste, difícil de leer en algunas secciones. Las fuentes (Cormorant Garamond, Geist Mono, Outfit) se cargaban vía `@import` de Google Fonts dentro de un `<style>` en tiempo de ejecución, y el proyecto conservaba dos versiones antiguas de la página (`antiguo.tsx`, `Antiguo2`) sin uso.

### v2 — Legibilidad y limpieza (actual)

**Legibilidad / tipografía**
- Texto de cuerpo (descripciones, bullets, párrafos) aumentado de 15px a 16–18px.
- Etiquetas pequeñas en mayúscula (mono, 9–11px) subidas un escalón cada una para mejorar la lectura.
- El cargo/rol en experiencia (el texto más chico del sitio, 12px) subido a 14px.
- Contraste de texto gris mejorado (`stone-500` → `stone-600`) en párrafos sobre fondo claro, para cumplir el mínimo de accesibilidad AA (4.5:1).

**Rendimiento / correctitud**
- Fuentes migradas de `@import` de Google Fonts (bloqueante, con parpadeo de carga) a `next/font/google`, eliminando la carga duplicada de Geist Mono.
- Agregado el prop `sizes` a las 4 imágenes con `fill` (Next.js Image) para eliminar warnings de performance.
- Corregidos 2 errores de lint de React (`setState` síncrono dentro de efectos) y una variable de estado sin usar.
- Metadata del `<head>` corregida (antes decía "Create Next App" por defecto de `create-next-app`) y `lang="es"` en el HTML.

**Limpieza**
- Eliminados `app/antiguo.tsx` y `app/Antiguo2`, versiones descartadas sin referencias en el proyecto.

Verificado con `npm run lint` y `npm run build` sin errores.

### v2.1 — Modo oscuro por defecto

El sitio ahora carga con el tema oscuro activo en la primera visita (antes iniciaba en claro). El toggle de tema sigue disponible para cambiar a modo claro en cualquier momento.

### v2.2 — SEO básico

- Metadata completa en `layout.tsx`: título con template, descripción, keywords, `metadataBase`, canonical y `theme-color`.
- Open Graph y Twitter Card (`summary_large_image`) para que los links compartidos muestren una tarjeta con imagen.
- Imagen social (`app/opengraph-image.tsx`) generada automáticamente con `next/og`, con la identidad visual del sitio — no requiere un archivo de imagen manual.
- `app/robots.ts` y `app/sitemap.ts` para generar `robots.txt` y `sitemap.xml` automáticamente.
- Datos estructurados JSON-LD (`schema.org/Person`) en el `<head>` para que buscadores identifiquen el sitio como el perfil profesional de una persona.

La URL usada en metadata (`https://eduardo-schettino.netlify.app`, vía `NEXT_PUBLIC_SITE_URL`) es un placeholder — se debe actualizar con la URL real una vez desplegado en Netlify (o el dominio propio).

### v3 — Rediseño editorial (actual)

Rediseño completo del sitio, reestructurado desde cero:

- **Layout**: barra lateral fija con navegación vertical (en vez de menú horizontal), contenido en columna única tipo "dossier" editorial.
- **Tipografía**: títulos serif a gran escala (`clamp` hasta 154px), etiquetas mono en mayúscula para metadatos.
- **Selector de paletas**: 5 temas intercambiables en vivo (Editorial, Midnight, Stark, Tesseract, Wakanda) mediante `data-theme` y variables CSS — **Stark** (rojo + oro) queda como paleta principal por defecto.
- **Secciones**: hero con foto de perfil, experiencia con logos de empresa, formación con barra de idiomas y certificación AVEVA, proyectos como filas expandibles (acordeón), y contacto con revelado de datos.
- Todo el contenido profesional (experiencia, formación, proyectos, contacto) se mantiene igual que en v2; solo cambia la presentación visual.

Verificado con `npm run lint` y `npm run build` sin errores.
