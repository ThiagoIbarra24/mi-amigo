Para agregar música al temporizador:
1. Coloca tus archivos .mp3 en esta carpeta
2. En src/pages/RutinaTimer.tsx busca:
   <AudioPlayer src={undefined} playing={phase === 'running'} />
3. Cambia undefined por:
   <AudioPlayer src="/music/mi-cancion.mp3" playing={phase === 'running'} />
