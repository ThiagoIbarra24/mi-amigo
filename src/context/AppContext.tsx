import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type PetType = 'dog' | 'cat' | 'rabbit';

export interface Routine {
  id: string;
  name: string;
  emoji: string;
  minutes: number;
  isDefault: boolean;
}

export interface DailyStats {
  count: number;
  minutes: number;
}

interface AppState {
  userName: string;
  pet: PetType | null;
  diamonds: number;
  routines: Routine[];
  completedDays: string[];
  dayActivities: Record<string, string[]>;
  streakGoal: number;
  achievements: string[];
  suggestion: string;
  ownedItems: string[];
  lastEmotion: string;
  hardMode: boolean;
  dailyStats: Record<string, DailyStats>;
  shownAchievements: number[];
}

interface AppContextType extends AppState {
  setUserName: (name: string) => void;
  setPet: (pet: PetType) => void;
  addDiamonds: (n: number) => void;
  spendDiamonds: (n: number) => boolean;
  addRoutine: (r: Omit<Routine, 'id'>) => void;
  removeRoutine: (id: string) => void;
  markTodayComplete: () => void;
  toggleActivity: (date: string, emoji: string) => void;
  setStreakGoal: (n: number) => void;
  setSuggestion: (s: string) => void;
  buyItem: (item: string) => boolean;
  setLastEmotion: (e: string) => void;
  setHardMode: (v: boolean) => void;
  registerRoutineDone: (minutes: number) => void;
  addShownAchievement: (n: number) => void;
  streak: number;
  todayStats: DailyStats;
}

const DEFAULT_ROUTINES: Routine[] = [
  { id: 'r1', name: 'Cepillarse los dientes', emoji: '🦷', minutes: 2, isDefault: true },
  { id: 'r2', name: 'Desayunar', emoji: '🍳', minutes: 15, isDefault: true },
  { id: 'r3', name: 'Leer un cuento', emoji: '📖', minutes: 10, isDefault: true },
];

const DEFAULT_STATE: AppState = {
  userName: '',
  pet: null,
  diamonds: 20,
  routines: DEFAULT_ROUTINES,
  completedDays: [],
  dayActivities: {},
  streakGoal: 15,
  achievements: ['Ir al cine', 'Comida favorita', 'Paseo en el parque', 'Jugar en familia'],
  suggestion: '',
  ownedItems: [],
  lastEmotion: '',
  hardMode: false,
  dailyStats: {},
  shownAchievements: [],
};

function loadState(): AppState {
  try {
    const raw = localStorage.getItem('mi-amigo-state');
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function calcStreak(completedDays: string[]): number {
  if (completedDays.length === 0) return 0;
  const sorted = [...completedDays].sort().reverse();
  const todayStr = today();
  let streak = 0;
  let current = new Date(todayStr);
  for (let i = 0; i < 365; i++) {
    const dateStr = current.toISOString().split('T')[0];
    if (sorted.includes(dateStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else if (dateStr === todayStr) {
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    localStorage.setItem('mi-amigo-state', JSON.stringify(state));
  }, [state]);

  const update = (partial: Partial<AppState>) => setState(s => ({ ...s, ...partial }));

  const todayStr = today();
  const todayStats: DailyStats = state.dailyStats[todayStr] || { count: 0, minutes: 0 };
  const streak = calcStreak(state.completedDays);

  const ctx: AppContextType = {
    ...state,
    streak,
    todayStats,
    setUserName: (name) => update({ userName: name }),
    setPet: (pet) => update({ pet }),
    addDiamonds: (n) => update({ diamonds: state.diamonds + n }),
    spendDiamonds: (n) => {
      if (state.diamonds < n) return false;
      update({ diamonds: state.diamonds - n });
      return true;
    },
    addRoutine: (r) => {
      const custom = state.routines.filter(x => !x.isDefault);
      if (custom.length >= 3) return;
      update({ routines: [...state.routines, { ...r, id: `c${Date.now()}` }] });
    },
    removeRoutine: (id) => update({ routines: state.routines.filter(r => r.id !== id) }),
    markTodayComplete: () => {
      if (!state.completedDays.includes(todayStr)) {
        update({ completedDays: [...state.completedDays, todayStr] });
      }
    },
    toggleActivity: (date, emoji) => {
      const current = state.dayActivities[date] || [];
      const next = current.includes(emoji)
        ? current.filter(e => e !== emoji)
        : [...current, emoji];
      update({ dayActivities: { ...state.dayActivities, [date]: next } });
    },
    setStreakGoal: (n) => update({ streakGoal: n }),
    setSuggestion: (s) => update({ suggestion: s }),
    buyItem: (item) => {
      if (state.diamonds < 10 || state.ownedItems.includes(item)) return false;
      update({ diamonds: state.diamonds - 10, ownedItems: [...state.ownedItems, item] });
      return true;
    },
    setLastEmotion: (e) => update({ lastEmotion: e }),
    setHardMode: (v) => update({ hardMode: v }),
    registerRoutineDone: (minutes) => {
      const s = state.dailyStats[todayStr] || { count: 0, minutes: 0 };
      update({
        dailyStats: {
          ...state.dailyStats,
          [todayStr]: { count: s.count + 1, minutes: s.minutes + minutes },
        },
      });
    },
    addShownAchievement: (n) => {
      if (!state.shownAchievements.includes(n)) {
        update({ shownAchievements: [...state.shownAchievements, n] });
      }
    },
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
