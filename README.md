# Mi Amigo 🐾

App de apoyo diario para niños con TEA/TDAH.

## Cómo correr localmente

```bash
npm install
npm run dev
```

## Cómo subir a Vercel

1. Sube este proyecto a GitHub
2. Ve a vercel.com → New Project → importa tu repo
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. ¡Listo! Vercel te dará un link para compartir

## Agregar música al temporizador

1. Coloca tu archivo .mp3 en `/public/music/`
2. En `src/pages/RutinaTimer.tsx` cambia:
   ```jsx
   <AudioPlayer src={undefined} .../>
   ```
   por:
   ```jsx
   <AudioPlayer src="/music/nombre-de-tu-cancion.mp3" .../>
   ```

## Estructura
- `src/pages/` — Pantallas de la app
- `src/components/` — Componentes reutilizables (PetMascot, etc.)
- `src/context/AppContext.tsx` — Estado global con localStorage
