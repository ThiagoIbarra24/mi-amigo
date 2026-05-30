import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PetMascot from '../components/PetMascot';

const EMOTIONS = [
  { emoji: '😊', label: 'Feliz', color: '#FFF3CD', border: '#F6C344', text: '#A07000' },
  { emoji: '😌', label: 'Tranquilo', color: '#D4EDDA', border: '#6DD98C', text: '#276732' },
  { emoji: '😴', label: 'Cansado', color: '#E2D9F3', border: '#B794F4', text: '#5B30A0' },
  { emoji: '😢', label: 'Triste', color: '#CCE5FF', border: '#5BC4E5', text: '#004085' },
  { emoji: '😠', label: 'Enojado', color: '#F8D7DA', border: '#F87171', text: '#721C24' },
];

export default function Emociones() {
  const { setLastEmotion, setHardMode, pet } = useApp();
  const navigate = useNavigate();

  const handleSelect = (emotion: typeof EMOTIONS[0]) => {
    setLastEmotion(emotion.emoji);
    // If tired/sad/angry → enable hard mode
    if (['😴', '😢', '😠'].includes(emotion.emoji)) {
      setHardMode(true);
    } else {
      setHardMode(false);
    }
    navigate('/mascota-seleccion');
  };

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-blue-50 to-white">
      {/* Header with pet */}
      <div className="flex flex-col items-center pt-8 pb-4 px-6">
        <div className="pet-float">
          <PetMascot pet={pet} mood="happy" size="md" animate />
        </div>
        <h2 className="text-2xl font-black text-gray-700 mt-4 text-center">¿Cómo te sientes hoy?</h2>
        <p className="text-gray-400 text-sm font-semibold mt-1">Toca cómo te sientes</p>
      </div>

      {/* Emotion buttons */}
      <div className="flex flex-col gap-3 px-6 pb-8 flex-1">
        {EMOTIONS.map((e, i) => (
          <button
            key={e.label}
            onClick={() => handleSelect(e)}
            className="slide-up flex items-center gap-4 rounded-2xl px-5 py-4 text-left font-bold text-lg transition-transform active:scale-95 shadow-sm"
            style={{
              backgroundColor: e.color,
              border: `2px solid ${e.border}`,
              color: e.text,
              animationDelay: `${i * 80}ms`,
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
            <span className="text-3xl">{e.emoji}</span>
            <span>{e.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
