import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ScreenHeaderProps {
  title: string;
  backTo?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export default function ScreenHeader({ title, backTo, onBack, rightAction, transparent }: ScreenHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) { onBack(); return; }
    if (backTo) navigate(backTo);
    else navigate(-1);
  };

  return (
    <div className={`flex items-center justify-between px-5 py-4 ${transparent ? '' : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'}`}>
      <button
        onClick={handleBack}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Volver"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5BC4E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-lg font-extrabold text-gray-700">{title}</h1>

      <div className="w-10 h-10 flex items-center justify-center">
        {rightAction || null}
      </div>
    </div>
  );
}
