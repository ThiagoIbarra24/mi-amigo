import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PetMascot from '../components/PetMascot';

export default function Inicio() {
  const { userName, setUserName, pet } = useApp();
  const [input, setInput] = useState(userName);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!input.trim()) return;
    setUserName(input.trim());
    navigate('/emociones');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full px-8 py-10 bg-gradient-to-b from-blue-50 to-green-50">
      {/* Logo area */}
      <div className="flex flex-col items-center gap-2 slide-up">
        <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-5xl">
          🐾
        </div>
        <h1 className="text-4xl font-black text-primary mt-2 tracking-tight">Mi Amigo</h1>
        <p className="text-gray-400 font-semibold text-sm">Tu compañero del día</p>
      </div>

      {/* Pet */}
      <div className="slide-up delay-200">
        <PetMascot pet={pet} mood="happy" size="xl" animate />
      </div>

      {/* Form */}
      <div className="w-full flex flex-col gap-4 slide-up delay-300">
        {userName ? (
          <div className="text-center">
            <p className="text-2xl font-black text-gray-700">¡Hola, <span className="text-primary">{userName}</span>! 👋</p>
            <p className="text-gray-400 text-sm mt-1">¿Listo para el día de hoy?</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <label className="text-center text-lg font-bold text-gray-600">¿Cómo te llamas?</label>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleStart()}
              placeholder="Escribe tu nombre..."
              className="w-full rounded-2xl border-2 border-gray-200 px-5 py-4 text-lg font-bold text-gray-700 outline-none focus:border-primary transition-colors bg-white text-center"
              autoFocus
            />
          </div>
        )}
        <button
          onClick={handleStart}
          disabled={!input.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Comenzar 🚀
        </button>
      </div>
    </div>
  );
}
