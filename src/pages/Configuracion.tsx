import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAY_NAMES = ['D','L','M','X','J','V','S'];

export default function Configuracion() {
  const {
    userName, setUserName,
    completedDays, dayActivities, toggleActivity,
    streakGoal, setStreakGoal,
    achievements, suggestion, setSuggestion,
    routines,
  } = useApp();

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(userName);
  const [goalInput, setGoalInput] = useState(streakGoal);
  const [suggestionInput, setSuggestionInput] = useState(suggestion);
  const [savedGoal, setSavedGoal] = useState(false);
  const [savedSuggestion, setSavedSuggestion] = useState(false);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

  const totalCompletedInMonth = completedDays.filter(d => {
    const dt = new Date(d + 'T00:00:00');
    return dt.getFullYear() === calYear && dt.getMonth() === calMonth;
  }).length;

  const routineEmojis = routines.map(r => r.emoji);

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <ScreenHeader title="Configuración" backTo="/menu" />

      <div className="overflow-y-auto no-scrollbar flex-1">
        {/* Name section */}
        <div className="mx-4 mt-4 bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          <p className="font-extrabold text-gray-600 text-sm mb-3">Nombre</p>
          {editName ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                className="flex-1 rounded-xl border-2 border-primary px-3 py-2 text-sm font-bold text-gray-700 outline-none"
                autoFocus
              />
              <button
                onClick={() => { setUserName(nameInput.trim() || userName); setEditName(false); }}
                className="btn-success"
                style={{ width: 'auto', padding: '8px 16px', fontSize: '14px' }}
              >
                OK
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-xl font-black text-gray-800">{userName}</p>
              <button
                onClick={() => { setNameInput(userName); setEditName(true); }}
                className="btn-ghost"
                style={{ width: 'auto', padding: '8px 20px', fontSize: '14px' }}
              >
                Cambiar nombre
              </button>
            </div>
          )}
        </div>

        {/* Calendar */}
        <div className="mx-4 mt-4 bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-bold text-lg">‹</button>
            <p className="font-extrabold text-gray-700">{MONTH_NAMES[calMonth]} {calYear}</p>
            <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-bold text-lg">›</button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAY_NAMES.map(d => (
              <div key={d} className="text-center text-xs font-extrabold text-gray-400">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isCompleted = completedDays.includes(dateStr);
              const isToday = dateStr === today.toISOString().split('T')[0];
              const isSelected = selectedDay === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                  className={`w-full aspect-square rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted ? 'bg-success text-white' :
                    isToday ? 'bg-primary text-white' :
                    isSelected ? 'bg-primary/20 text-primary' :
                    'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-gray-400 font-semibold mt-3">
            Total días con rutina: <span className="text-success font-black">{totalCompletedInMonth}</span>
          </p>

          {/* Day activities */}
          {selectedDay && (
            <div className="mt-4 border-t border-gray-100 pt-4 fade-in">
              <p className="text-sm font-extrabold text-gray-600 mb-1">
                Actividades del día {Number(selectedDay.split('-')[2])}
              </p>
              <p className="text-xs text-gray-400 mb-3">Toca un emoji para marcar la actividad realizada.</p>
              <div className="flex flex-wrap gap-3">
                {routineEmojis.map((emoji, i) => {
                  const acts = dayActivities[selectedDay] || [];
                  const isActive = acts.includes(emoji);
                  const rName = routines[i]?.name || '';
                  return (
                    <button
                      key={emoji + i}
                      onClick={() => toggleActivity(selectedDay, emoji)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                        isActive ? 'bg-success/20 ring-2 ring-success' : 'bg-gray-100'
                      }`}
                    >
                      <span className="text-2xl">{emoji}</span>
                      <span className="text-xs font-bold text-gray-500 max-w-[50px] text-center leading-tight">{rName.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Streak goal */}
        <div className="mx-4 mt-4 bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          <p className="font-extrabold text-gray-600 text-sm mb-1">Racha de recompensa</p>
          <p className="text-xs text-gray-400 mb-4">Cantidad de días seguidos para entregar un logro.</p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={goalInput}
              onChange={e => setGoalInput(Number(e.target.value))}
              min={1} max={60}
              className="w-16 text-center rounded-xl border-2 border-gray-200 py-2 text-lg font-black text-gray-700 outline-none focus:border-primary"
            />
            <span className="text-gray-500 font-semibold text-sm">días</span>
            <button
              onClick={() => { setStreakGoal(goalInput); setSavedGoal(true); setTimeout(() => setSavedGoal(false), 2000); }}
              className="btn-success"
              style={{ width: 'auto', padding: '8px 20px', fontSize: '14px' }}
            >
              {savedGoal ? '✓ Guardado' : 'Guardar'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Actual: cada {streakGoal} días.</p>
        </div>

        {/* Achievements */}
        <div className="mx-4 mt-4 bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          <p className="font-extrabold text-gray-600 text-sm mb-1">Logros</p>
          <p className="text-xs text-gray-400 mb-4">Logros especiales que aparecerán cada {streakGoal} días.</p>
          <div className="flex flex-col gap-2">
            {achievements.map((a, i) => (
              <div key={a} className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
                <p className="text-xs font-bold text-green-500">Logro {i+1} · día {(i+1) * streakGoal}</p>
                <p className="font-extrabold text-gray-700">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="mx-4 mt-4 mb-6 bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          <p className="font-extrabold text-gray-600 text-sm mb-1">Sugerencias</p>
          <p className="text-xs text-gray-400 mb-3">Escribe una sugerencia de logros que podamos agregar.</p>
          <textarea
            value={suggestionInput}
            onChange={e => setSuggestionInput(e.target.value)}
            placeholder="Tu sugerencia..."
            rows={3}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:border-primary resize-none"
          />
          <button
            onClick={() => { setSuggestion(suggestionInput); setSavedSuggestion(true); setTimeout(() => setSavedSuggestion(false), 2000); }}
            className="btn-primary mt-3"
            style={{ fontSize: '15px', padding: '12px' }}
          >
            {savedSuggestion ? '✓ Guardado' : 'Guardar sugerencia'}
          </button>
        </div>
      </div>
    </div>
  );
}
