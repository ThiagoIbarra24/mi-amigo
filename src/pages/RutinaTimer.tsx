import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PetMascot from '../components/PetMascot';
import ScreenHeader from '../components/ScreenHeader';
import AudioPlayer from '../components/AudioPlayer';

type Phase = 'anticipation' | 'running' | 'done';

export default function RutinaTimer() {
  const { id } = useParams<{ id: string }>();
  const { routines, hardMode, registerRoutineDone, markTodayComplete, pet } = useApp();
  const navigate = useNavigate();

  const routine = routines.find(r => r.id === id);
  const effectiveMinutes = routine
    ? hardMode ? Math.max(1, Math.floor(routine.minutes * 0.5)) : routine.minutes
    : 1;
  const totalSeconds = effectiveMinutes * 60;

  const [phase, setPhase] = useState<Phase>('anticipation');
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [showDistracted, setShowDistracted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (phase === 'running') {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            handleDone();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase]);

  const handleDone = () => {
    if (routine) {
      registerRoutineDone(effectiveMinutes);
      markTodayComplete();
    }
    setPhase('done');
  };

  const handleFinish = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    handleDone();
  };

  if (!routine) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center bg-gray-50">
        <ScreenHeader title="Rutina" backTo="/rutina" />
        <p className="text-gray-500 font-bold mt-10">Rutina no encontrada</p>
      </div>
    );
  }

  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // Progress bar color
  const barColor = progress < 50 ? '#5BC4E5' : progress < 80 ? '#F6C344' : '#6DD98C';

  // ANTICIPATION PHASE
  if (phase === 'anticipation') {
    return (
      <div className="flex flex-col min-h-full bg-white">
        <ScreenHeader title="" backTo="/rutina" transparent />
        <div className="flex flex-col items-center justify-center flex-1 px-8 gap-6">
          <div className="celebrate-in text-7xl">{routine.emoji}</div>
          <div className="text-center slide-up delay-200">
            <p className="text-gray-400 font-bold text-base mb-1">Ahora harás:</p>
            <h2 className="text-3xl font-black text-gray-800">{routine.name}</h2>
            <p className="text-gray-400 font-semibold mt-2">{effectiveMinutes} min</p>
          </div>
          <div className="slide-up delay-300 w-full">
            <button onClick={() => setPhase('running')} className="btn-primary">
              Empezar ▶
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DONE PHASE
  if (phase === 'done') {
    return (
      <div className="flex flex-col min-h-full bg-gradient-to-b from-green-50 to-white">
        <ScreenHeader title="¡Listo!" backTo="/rutina" transparent />
        <div className="flex flex-col items-center justify-center flex-1 px-8 gap-5">
          {/* Confetti */}
          <div className="relative">
            {['🎉', '⭐', '🌟', '✨', '🎊'].map((c, i) => (
              <span
                key={i}
                className="absolute text-2xl"
                style={{
                  animation: `confetti 1s ease-out ${i * 150}ms forwards`,
                  left: `${(i - 2) * 30}px`,
                  top: '-10px',
                }}
              >
                {c}
              </span>
            ))}
            <div className="celebrate-in">
              <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                <PetMascot pet={pet} mood="happy" size="md" animate />
              </div>
            </div>
          </div>

          <div className="text-center slide-up delay-300">
            <h2 className="text-3xl font-black text-gray-800 mb-1">¡Felicidades! 🎉</h2>
            <p className="text-gray-600 font-bold">Hiciste <span className="text-primary">{routine.name}</span></p>
            <p className="text-gray-400 text-sm font-semibold mt-1">Rutina completada con éxito</p>
          </div>

          <div className="w-full slide-up delay-400 flex flex-col gap-3">
            <button onClick={() => navigate('/rutina')} className="btn-success">
              Continuar →
            </button>
            <button onClick={() => navigate('/menu')} className="btn-ghost">
              Ir al menú
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RUNNING PHASE
  return (
    <div className="flex flex-col min-h-full bg-white">
      <ScreenHeader title={routine.name} backTo="/rutina" />

      {/* Background music - ready for mp3 file */}
      {/* To add music: place mp3 in /public/music/ and set src below */}
      <AudioPlayer src={undefined} playing={phase === 'running'} />

      <div className="flex flex-col items-center flex-1 px-6 py-4 gap-4">
        {/* Pet mascot animated while timer runs */}
        <div className="timer-pulse">
          <div className="relative">
            <div className="pulse-ring absolute inset-0 rounded-full bg-primary/20" />
            <div className="w-36 h-36 rounded-full bg-blue-50 flex items-center justify-center relative z-10">
              <PetMascot pet={pet} mood="working" size="md" animate />
            </div>
          </div>
        </div>

        {/* Timer display */}
        <div className="text-center">
          <p className="text-6xl font-black text-gray-800 tabular-nums">{timeStr}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${progress}%`, backgroundColor: barColor }}
          />
        </div>
        <p className="text-xs text-gray-400 font-semibold -mt-2">{Math.round(progress)}% completado</p>

        {/* Distracted message */}
        {showDistracted ? (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 text-center fade-in">
            <p className="text-blue-700 font-bold text-sm">💙 Está bien, vuelve cuando puedas.</p>
            <p className="text-blue-400 text-xs mt-1">El tiempo seguirá cuando estés listo</p>
            <button
              onClick={() => setShowDistracted(false)}
              className="mt-3 text-blue-600 font-bold text-sm underline"
            >
              Ya estoy listo
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDistracted(true)}
            className="text-gray-400 text-sm font-semibold underline"
          >
            Me distraje
          </button>
        )}

        {/* Finish button */}
        <div className="w-full mt-auto">
          <button onClick={handleFinish} className="btn-success">
            Finalizar ✓
          </button>
        </div>
      </div>
    </div>
  );
}
