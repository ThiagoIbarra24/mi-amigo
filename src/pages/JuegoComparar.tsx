import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';

// 10 animal comparisons - easy to compare visually
// heightRatio: relative visual height (1.0 = base, bigger = taller)
const ROUNDS = [
  {
    question: '¿Cuál es más alto?',
    animals: [
      { name: 'Jirafa', emoji: '🦒', height: 200, color: '#F6C344', hint: 'El más alto del mundo' },
      { name: 'Ratón', emoji: '🐭', height: 60, color: '#C0C0C0', hint: 'Muy pequeñito' },
    ],
    correct: 0,
  },
  {
    question: '¿Cuál es más grande?',
    animals: [
      { name: 'Elefante', emoji: '🐘', height: 190, color: '#A0A0B0', hint: 'Animal terrestre más grande' },
      { name: 'Hormiga', emoji: '🐜', height: 50, color: '#5A3010', hint: 'Muy muy pequeña' },
    ],
    correct: 0,
  },
  {
    question: '¿Cuál es más alto?',
    animals: [
      { name: 'Pingüino', emoji: '🐧', height: 90, color: '#303040', hint: 'Mediano' },
      { name: 'Avestruz', emoji: '🦩', height: 175, color: '#E88080', hint: 'El pájaro más alto' },
    ],
    correct: 1,
  },
  {
    question: '¿Cuál es más grande?',
    animals: [
      { name: 'Ballena', emoji: '🐋', height: 55, color: '#5080C0', hint: 'Enorme pero acostada', wide: true },
      { name: 'Pulpo', emoji: '🐙', height: 80, color: '#D060A0', hint: 'Mediano' },
    ],
    correct: 0,
  },
  {
    question: '¿Cuál es más alto?',
    animals: [
      { name: 'Caballo', emoji: '🐴', height: 160, color: '#8B6040', hint: 'Alto y fuerte' },
      { name: 'Gato', emoji: '🐱', height: 70, color: '#E8A060', hint: 'Pequeño' },
    ],
    correct: 0,
  },
  {
    question: '¿Cuál es más alto?',
    animals: [
      { name: 'Cocodrilo', emoji: '🐊', height: 60, color: '#508040', hint: 'Largo pero bajo', wide: true },
      { name: 'Oso', emoji: '🐻', height: 170, color: '#8B5020', hint: 'Muy grande de pie' },
    ],
    correct: 1,
  },
  {
    question: '¿Cuál es más grande?',
    animals: [
      { name: 'León', emoji: '🦁', height: 160, color: '#D4A020', hint: 'El rey de la selva' },
      { name: 'Hámster', emoji: '🐹', height: 50, color: '#E8C080', hint: 'Cabe en tu mano' },
    ],
    correct: 0,
  },
  {
    question: '¿Cuál es más alto?',
    animals: [
      { name: 'Canguro', emoji: '🦘', height: 180, color: '#C07840', hint: 'Salta muy alto' },
      { name: 'Conejo', emoji: '🐰', height: 75, color: '#E0D0C0', hint: 'Pequeño y suave' },
    ],
    correct: 0,
  },
  {
    question: '¿Cuál es más grande?',
    animals: [
      { name: 'Mariposa', emoji: '🦋', height: 50, color: '#8080E0', hint: 'Pequeña y linda' },
      { name: 'Gorila', emoji: '🦍', height: 185, color: '#404040', hint: 'Muy fuerte y grande' },
    ],
    correct: 1,
  },
  {
    question: '¿Cuál es más alto?',
    animals: [
      { name: 'Flamenco', emoji: '🦩', height: 175, color: '#F090A0', hint: 'Muy elegante' },
      { name: 'Pollito', emoji: '🐥', height: 55, color: '#F6C344', hint: 'Recién nacido' },
    ],
    correct: 0,
  },
];

export default function JuegoComparar() {
  const navigate = useNavigate();
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = ROUNDS[round];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === current.correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (round + 1 >= ROUNDS.length) {
      setFinished(true);
    } else {
      setRound(r => r + 1);
      setSelected(null);
      setFeedback(null);
    }
  };

  if (finished) {
    const perfect = score === ROUNDS.length;
    return (
      <div className="flex flex-col min-h-full bg-gradient-to-b from-yellow-50 to-white">
        <ScreenHeader title="¿Cuál es más alto?" backTo="/minijuegos" />
        <div className="flex flex-col items-center justify-center flex-1 px-8 gap-6">
          <div className="celebrate-in text-7xl">{perfect ? '🏆' : '⭐'}</div>
          <div className="text-center slide-up delay-200">
            <h2 className="text-3xl font-black text-gray-800 mb-2">
              {perfect ? '¡Perfecto!' : '¡Muy bien!'}
            </h2>
            <p className="text-xl font-bold text-gray-600">
              {score} de {ROUNDS.length} correctas
            </p>
            <div className="flex justify-center gap-1 mt-3">
              {ROUNDS.map((_, i) => (
                <span key={i} className="text-xl">{i < score ? '⭐' : '○'}</span>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 slide-up delay-300">
            <button onClick={() => { setRound(0); setSelected(null); setFeedback(null); setScore(0); setFinished(false); }} className="btn-primary">
              Jugar de nuevo 🔄
            </button>
            <button onClick={() => navigate('/minijuegos')} className="btn-ghost">
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-yellow-50 to-white">
      <ScreenHeader title="¿Cuál es más alto?" backTo="/minijuegos" />

      {/* Progress dots */}
      <div className="flex justify-center gap-2 py-3">
        {ROUNDS.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i < round ? 'bg-success' : i === round ? 'bg-primary w-5' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="text-center px-6 mb-4">
        <h2 className="text-2xl font-black text-gray-800">{current.question}</h2>
        <p className="text-gray-400 text-sm font-semibold mt-1">Toca al animal correcto</p>
      </div>

      {/* Animals */}
      <div className="flex justify-center items-end gap-4 px-6 mb-4 flex-1">
        {current.animals.map((animal, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === current.correct;
          const showResult = selected !== null;

          let borderColor = 'border-gray-200';
          let bgColor = 'bg-white';
          if (showResult && isSelected && isCorrect) { borderColor = 'border-green-400'; bgColor = 'bg-green-50'; }
          if (showResult && isSelected && !isCorrect) { borderColor = 'border-red-400'; bgColor = 'bg-red-50'; }
          if (showResult && !isSelected && isCorrect) { borderColor = 'border-green-400'; bgColor = 'bg-green-50'; }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`flex flex-col items-center justify-end rounded-3xl border-2 shadow-md p-4 flex-1 transition-all ${bgColor} ${borderColor} ${
                selected === null ? 'active:scale-95 hover:shadow-lg' : ''
              } ${isSelected ? 'ring-4 ring-offset-2 ring-primary/40' : ''}`}
              style={{ minHeight: '200px' }}
              disabled={selected !== null}
            >
              {/* Animal visual */}
              <div
                className="flex items-end justify-center mb-2"
                style={{ height: '160px' }}
              >
                <span
                  style={{
                    fontSize: `${Math.min(animal.height * 0.65, 110)}px`,
                    lineHeight: 1,
                    display: 'block',
                    filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
                  }}
                >
                  {animal.emoji}
                </span>
              </div>

              <p className="font-extrabold text-gray-700 text-base">{animal.name}</p>
              <p className="text-xs text-gray-400 font-semibold text-center leading-tight mt-0.5">{animal.hint}</p>

              {/* Result icon */}
              {showResult && (isSelected || isCorrect) && (
                <div className="mt-2 text-xl star-pop">
                  {isCorrect ? '✅' : '❌'}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next */}
      {feedback && (
        <div className="px-6 pb-6 flex flex-col gap-3 slide-up">
          <div className={`rounded-2xl px-4 py-3 text-center ${
            feedback === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'
          }`}>
            <p className={`font-extrabold text-base ${feedback === 'correct' ? 'text-green-700' : 'text-orange-600'}`}>
              {feedback === 'correct' ? '✅ ¡Muy bien!' : '💪 ¡Casi! Inténtalo con el otro'}
            </p>
          </div>
          <button onClick={handleNext} className="btn-primary">
            {round + 1 >= ROUNDS.length ? 'Ver resultado 🏆' : 'Siguiente →'}
          </button>
        </div>
      )}
    </div>
  );
}
