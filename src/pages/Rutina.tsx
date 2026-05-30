import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';

const EMOJI_OPTIONS = ['🦷', '🍳', '📖', '✏️', '🎒', '🛁', '🛏️', '🧹', '🎨', '🚶', '💊', '🧃', '🎵', '🐾', '⚽'];

export default function Rutina() {
  const { routines, addRoutine, removeRoutine, hardMode } = useApp();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmoji, setNewEmoji] = useState('✏️');
  const [newMinutes, setNewMinutes] = useState(5);

  const customRoutines = routines.filter(r => !r.isDefault);

  const handleAdd = () => {
    if (!newName.trim()) return;
    addRoutine({ name: newName.trim(), emoji: newEmoji, minutes: newMinutes, isDefault: false });
    setNewName('');
    setNewEmoji('✏️');
    setNewMinutes(5);
    setShowAdd(false);
  };

  const getEffectiveMinutes = (minutes: number) => hardMode ? Math.max(1, Math.floor(minutes * 0.5)) : minutes;

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <ScreenHeader title="Rutina diaria" backTo="/menu" />

      {/* Hard mode banner */}
      {hardMode && (
        <div className="mx-4 mt-3 bg-purple-50 border border-purple-200 rounded-2xl px-4 py-3 text-center">
          <p className="text-purple-700 font-bold text-sm">🌙 Solo intenta una cosa</p>
          <p className="text-purple-500 text-xs">Está bien, vamos poco a poco</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3 no-scrollbar">
        {/* Routines list */}
        <div className="flex flex-col gap-3">
          {routines.map((r, i) => {
            const mins = getEffectiveMinutes(r.minutes);
            const isFirst = i === 0;
            const dimmed = hardMode && !isFirst;
            return (
              <div
                key={r.id}
                className={`slide-up bg-white rounded-2xl px-4 py-3 shadow-sm border flex items-center gap-3 transition-opacity ${
                  dimmed ? 'opacity-40' : 'opacity-100'
                } ${hardMode && isFirst ? 'border-purple-300 ring-2 ring-purple-200' : 'border-gray-100'}`}
                style={{ animationDelay: `${i * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <span className="text-2xl flex-shrink-0">{r.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-gray-700 text-sm truncate">{r.name}</p>
                  <p className="text-xs text-gray-400 font-semibold">
                    {mins} min{hardMode && r.minutes !== mins ? ' · más fácil' : ''}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/rutina/${r.id}`)}
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm active:scale-95 transition-transform"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </button>
                {!r.isDefault && (
                  <button
                    onClick={() => removeRoutine(r.id)}
                    className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 active:scale-95"
                  >
                    <span className="text-red-400 text-sm font-bold">✕</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Add routine */}
        {customRoutines.length < 3 && !showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="mt-4 w-full rounded-2xl border-2 border-dashed border-gray-300 py-3 text-gray-400 font-bold text-sm flex items-center justify-center gap-2 active:bg-gray-50"
          >
            <span className="text-lg">+</span> Agregar tarea ({customRoutines.length}/3)
          </button>
        )}

        {/* Add form */}
        {showAdd && (
          <div className="mt-4 bg-white rounded-3xl shadow-md border border-gray-100 p-5 slide-up">
            <p className="font-extrabold text-gray-700 mb-3">Nueva tarea</p>

            {/* Emoji picker */}
            <div className="flex flex-wrap gap-2 mb-3">
              {EMOJI_OPTIONS.map(e => (
                <button
                  key={e}
                  onClick={() => setNewEmoji(e)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                    newEmoji === e ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-100'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Nombre de la tarea..."
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 outline-none focus:border-primary mb-3"
              autoFocus
            />

            <div className="flex items-center gap-3 mb-4">
              <label className="text-sm font-bold text-gray-500">Minutos:</label>
              <input
                type="range"
                min={1}
                max={30}
                value={newMinutes}
                onChange={e => setNewMinutes(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-extrabold text-primary w-8 text-center">{newMinutes}</span>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowAdd(false)} className="btn-ghost" style={{ padding: '10px 16px', fontSize: '14px' }}>
                Cancelar
              </button>
              <button onClick={handleAdd} className="btn-success" style={{ padding: '10px 16px', fontSize: '14px' }}>
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
