import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';

const GAMES = [
  {
    id: 'comparar',
    title: '¿Cuál es más alto?',
    description: 'Compara animales por tamaño',
    emoji: '🦒',
    color: '#FFF3CD',
    border: '#F6C344',
  },
];

export default function Minijuegos() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <ScreenHeader title="Minijuegos" backTo="/menu" />

      <div className="px-5 py-4 flex flex-col gap-4">
        {GAMES.map((g, i) => (
          <button
            key={g.id}
            onClick={() => navigate(`/juego/${g.id}`)}
            className="slide-up bg-white rounded-3xl shadow-sm border-2 p-5 text-left flex items-center gap-4 active:scale-95 transition-transform"
            style={{
              borderColor: g.border,
              backgroundColor: g.color,
              animationDelay: `${i * 80}ms`,
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
            <span className="text-5xl">{g.emoji}</span>
            <div>
              <p className="font-extrabold text-gray-800 text-lg">{g.title}</p>
              <p className="text-gray-500 text-sm font-semibold">{g.description}</p>
            </div>
            <svg className="ml-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}

        <div className="text-center mt-4 text-gray-300 text-sm font-bold">
          Más juegos próximamente 🎮
        </div>
      </div>
    </div>
  );
}
