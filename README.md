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
