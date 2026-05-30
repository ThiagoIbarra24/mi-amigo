import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PetMascot from '../components/PetMascot';
import { PetType } from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';

const PETS: { type: PetType; label: string }[] = [
  { type: 'dog', label: 'Perro' },
  { type: 'cat', label: 'Gato' },
  { type: 'rabbit', label: 'Conejo' },
];

export default function MascotaSeleccion() {
  const { setPet, pet: currentPet } = useApp();
  const navigate = useNavigate();

  const handleSelect = (type: PetType) => {
    setPet(type);
    navigate('/menu');
  };

  return (
    <div className="flex flex-col min-h-full bg-gradient-to-b from-green-50 to-white">
      <ScreenHeader title="Elige tu mascota" backTo="/emociones" />

      <div className="flex flex-col items-center px-4 pt-2">
        <p className="text-gray-400 font-semibold text-sm mb-6">Será tu compañero</p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          {PETS.map((p, i) => (
            <button
              key={p.type}
              onClick={() => handleSelect(p.type)}
              className={`slide-up flex items-center gap-4 rounded-3xl p-4 bg-white shadow-md border-2 transition-all active:scale-95 ${
                currentPet === p.type ? 'border-primary shadow-lg' : 'border-gray-100'
              }`}
              style={{ animationDelay: `${i * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="flex-shrink-0">
                <PetMascot pet={p.type} mood="happy" size="sm" animate />
              </div>
              <span className="text-xl font-extrabold text-gray-700">{p.label}</span>
              {currentPet === p.type && (
                <span className="ml-auto text-primary text-xl">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
