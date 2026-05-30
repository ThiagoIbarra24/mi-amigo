import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PetMascot from '../components/PetMascot';

export default function Menu() {
  const { userName, pet, lastEmotion, hardMode, setHardMode, todayStats: rawTodayStats, routines, streak,
    streakGoal, achievements, shownAchievements, addShownAchievement } = useApp();
  const todayStats = rawTodayStats ?? { count: 0, minutes: 0 };
  const navigate = useNavigate();
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState('');

  // Check for streak achievement
  useEffect(() => {
    if (streak > 0 && streak % streakGoal === 0) {
      const idx = Math.floor(streak / streakGoal) - 1;
      if (idx >= 0 && idx < achievements.length && !shownAchievements.includes(streak)) {
        setCurrentAchievement(achievements[idx]);
        setShowAchievement(true);
        addShownAchievement(streak);
      }
    }
  }, [streak]);

  const totalRoutines = routines.length;

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-sky-50 to-white pb-6">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <p className="text-sm font-bold text-gray-400">Hola,</p>
          <p className="text-2xl font-black text-gray-700">{userName || 'Amigo'} 👋</p>
        </div>
        <button
          onClick={() => navigate('/configuracion')}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
      </div>

      {/* Stats card */}
      <div className="mx-5 bg-white rounded-3xl shadow-sm border border-gray-100 p-4 slide-up">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{lastEmotion || '😊'}</span>
          <p className="text-sm font-bold text-gray-500">Hoy</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xl font-black text-primary">{todayStats.count}</p>
            <p className="text-xs text-gray-400 font-semibold leading-tight">de {totalRoutines} rutinas</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-xl font-black text-success">{todayStats.minutes}</p>
            <p className="text-xs text-gray-400 font-semibold leading-tight">minutos hoy</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-warning">🔥 {streak}</p>
            <p className="text-xs text-gray-400 font-semibold leading-tight">días seguidos</p>
          </div>
        </div>
      </div>

      {/* Pet */}
      <div className="flex justify-center my-4 slide-up delay-100">
        <PetMascot pet={pet} mood={hardMode ? 'tired' : 'happy'} size="lg" animate />
      </div>

      {/* Hard mode banner */}
      {hardMode && (
        <div className="mx-5 mb-4 bg-purple-50 border border-purple-200 rounded-2xl p-3 text-center fade-in">
          <p className="text-purple-700 font-bold text-sm">💜 Modo tranquilo activado</p>
          <p className="text-purple-500 text-xs mt-0.5">No necesitas hacer todo hoy</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 px-5 slide-up delay-200">
        <button
          onClick={() => navigate('/rutina')}
          className="btn-primary flex items-center justify-center gap-3"
        >
          <span>✅</span> Rutina diaria
        </button>

        <button
          onClick={() => navigate('/minijuegos')}
          className="btn-success flex items-center justify-center gap-3"
        >
          <span>🎮</span> Minijuegos
        </button>

        <button
          onClick={() => setHardMode(!hardMode)}
          className={`btn-ghost flex items-center justify-center gap-3 ${hardMode ? 'border-green-300 text-green-600' : ''}`}
        >
          {hardMode ? '💚 Ya me siento mejor' : '💜 Hoy me siento mal'}
        </button>
      </div>

      {/* Achievement modal */}
      {showAchievement && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-8 fade-in">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl modal-in w-full max-w-xs">
            <div className="text-5xl mb-4 star-pop inline-block">🏆</div>
            <h3 className="text-2xl font-black text-gray-700 mb-2">¡Logro desbloqueado!</h3>
            <p className="text-gray-500 font-semibold mb-1">Has ganado:</p>
            <p className="text-xl font-black text-primary mb-6">{currentAchievement}</p>
            <button
              onClick={() => setShowAchievement(false)}
              className="btn-success"
            >
              ¡Qué bueno! 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
