import React from 'react';
import { PetType } from '../context/AppContext';

interface PetMascotProps {
  pet: PetType | null;
  mood?: 'happy' | 'calm' | 'tired' | 'working';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const sizes = { sm: 80, md: 120, lg: 160, xl: 200 };

// Animated 3D-style Dog SVG
function DogSVG({ mood, animate, size }: { mood: string; animate: boolean; size: number }) {
  const isWorking = mood === 'working';
  const isHappy = mood === 'happy';
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dogBody" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#D4956A" />
          <stop offset="100%" stopColor="#A0622A" />
        </radialGradient>
        <radialGradient id="dogFace" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#E8A97A" />
          <stop offset="100%" stopColor="#C07040" />
        </radialGradient>
        <radialGradient id="dogNose" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#444" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
        <radialGradient id="dogEye" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#4a3520" />
          <stop offset="100%" stopColor="#1a0d00" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="5" stdDeviation="4" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Shadow on ground */}
      <ellipse cx="100" cy="188" rx="45" ry="8" fill="rgba(0,0,0,0.12)" />

      {/* Body */}
      <ellipse cx="100" cy="145" rx="42" ry="35" fill="url(#dogBody)" filter="url(#shadow)" />

      {/* Tail - wags when working */}
      <g transform-origin="100 145" style={animate && isWorking ? { animation: 'tailWag 0.5s ease-in-out infinite' } : {}}>
        <path d="M142 135 Q165 115 160 100 Q158 93 152 98 Q156 110 138 128 Z" fill="#A0622A" />
      </g>

      {/* Front legs */}
      <rect x="72" y="160" width="18" height="28" rx="9" fill="#C07040" />
      <rect x="110" y="160" width="18" height="28" rx="9" fill="#C07040" />
      {/* Paws */}
      <ellipse cx="81" cy="188" rx="11" ry="7" fill="#A05030" />
      <ellipse cx="119" cy="188" rx="11" ry="7" fill="#A05030" />

      {/* Head */}
      <circle cx="100" cy="95" r="40" fill="url(#dogFace)" filter="url(#shadow)" />

      {/* Left ear - wiggle when happy */}
      <g transform-origin="75 75" style={animate && isHappy ? { animation: 'earWiggle 0.8s ease-in-out infinite' } : {}}>
        <ellipse cx="72" cy="68" rx="16" ry="22" fill="#A0622A" transform="rotate(-15 72 68)" />
      </g>
      {/* Right ear */}
      <g transform-origin="128 75" style={animate && isHappy ? { animation: 'earWiggle 0.8s ease-in-out infinite', animationDelay: '0.2s' } : {}}>
        <ellipse cx="128" cy="68" rx="16" ry="22" fill="#A0622A" transform="rotate(15 128 68)" />
      </g>

      {/* Snout */}
      <ellipse cx="100" cy="108" rx="22" ry="16" fill="#E8C090" />

      {/* Nose */}
      <ellipse cx="100" cy="103" rx="9" ry="7" fill="url(#dogNose)" />
      <ellipse cx="97" cy="101" rx="3" ry="2" fill="rgba(255,255,255,0.4)" />

      {/* Eyes */}
      <g style={animate ? { animation: 'eyeBlink 4s ease-in-out infinite' } : {}}>
        <circle cx="84" cy="90" r="8" fill="url(#dogEye)" />
        <circle cx="116" cy="90" r="8" fill="url(#dogEye)" />
        <circle cx="86" cy="88" r="2.5" fill="white" />
        <circle cx="118" cy="88" r="2.5" fill="white" />
      </g>

      {/* Mouth */}
      {isHappy || isWorking ? (
        <path d="M91 115 Q100 123 109 115" stroke="#7a4520" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M91 116 Q100 120 109 116" stroke="#7a4520" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* Tongue when happy/working */}
      {(isHappy || isWorking) && (
        <ellipse cx="100" cy="121" rx="7" ry="5" fill="#F08080" />
      )}

      {/* Blush */}
      <ellipse cx="76" cy="100" rx="8" ry="5" fill="rgba(255,150,100,0.3)" />
      <ellipse cx="124" cy="100" rx="8" ry="5" fill="rgba(255,150,100,0.3)" />
    </svg>
  );
}

// Animated 3D-style Cat SVG
function CatSVG({ mood, animate, size }: { mood: string; animate: boolean; size: number }) {
  const isWorking = mood === 'working';
  const isHappy = mood === 'happy';
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="catBody" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#E8B870" />
          <stop offset="100%" stopColor="#C08030" />
        </radialGradient>
        <radialGradient id="catFace" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F0C880" />
          <stop offset="100%" stopColor="#D09040" />
        </radialGradient>
        <filter id="catShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="5" stdDeviation="4" floodOpacity="0.25" />
        </filter>
      </defs>

      <ellipse cx="100" cy="188" rx="45" ry="8" fill="rgba(0,0,0,0.12)" />

      {/* Body */}
      <ellipse cx="100" cy="145" rx="40" ry="35" fill="url(#catBody)" filter="url(#catShadow)" />

      {/* Tail - curves */}
      <path d="M140 155 Q175 145 172 120 Q170 108 160 115 Q168 128 138 148 Z"
        fill="#C08030"
        style={animate && isWorking ? { animation: 'tailWag 0.7s ease-in-out infinite', transformOrigin: '140px 155px' } : {}} />

      {/* Legs */}
      <rect x="74" y="162" width="16" height="26" rx="8" fill="#C08030" />
      <rect x="110" y="162" width="16" height="26" rx="8" fill="#C08030" />
      <ellipse cx="82" cy="188" rx="10" ry="6" fill="#A06020" />
      <ellipse cx="118" cy="188" rx="10" ry="6" fill="#A06020" />

      {/* Head */}
      <circle cx="100" cy="93" r="38" fill="url(#catFace)" filter="url(#catShadow)" />

      {/* Ears - pointy */}
      <g style={animate && isHappy ? { animation: 'earWiggle 1s ease-in-out infinite', transformOrigin: '74px 62px' } : {}}>
        <polygon points="65,75 74,48 88,72" fill="#C08030" />
        <polygon points="69,73 74,53 84,70" fill="#F0A0A0" />
      </g>
      <g style={animate && isHappy ? { animation: 'earWiggle 1s ease-in-out infinite', animationDelay: '0.3s', transformOrigin: '126px 62px' } : {}}>
        <polygon points="112,72 126,48 135,75" fill="#C08030" />
        <polygon points="116,70 126,53 131,73" fill="#F0A0A0" />
      </g>

      {/* Snout */}
      <ellipse cx="100" cy="106" rx="18" ry="13" fill="#F5D8A0" />

      {/* Nose */}
      <polygon points="100,100 95,106 105,106" fill="#E87090" />

      {/* Whiskers */}
      <line x1="70" y1="105" x2="85" y2="107" stroke="#888" strokeWidth="1.5" />
      <line x1="70" y1="110" x2="85" y2="109" stroke="#888" strokeWidth="1.5" />
      <line x1="115" y1="107" x2="130" y2="105" stroke="#888" strokeWidth="1.5" />
      <line x1="115" y1="109" x2="130" y2="110" stroke="#888" strokeWidth="1.5" />

      {/* Eyes - slitted */}
      <g style={animate ? { animation: 'eyeBlink 5s ease-in-out infinite' } : {}}>
        <ellipse cx="84" cy="88" rx="8" ry="8" fill="#7DB87D" />
        <ellipse cx="116" cy="88" rx="8" ry="8" fill="#7DB87D" />
        <ellipse cx="84" cy="88" rx="3" ry="7" fill="#111" />
        <ellipse cx="116" cy="88" rx="3" ry="7" fill="#111" />
        <circle cx="86" cy="86" r="2" fill="white" />
        <circle cx="118" cy="86" r="2" fill="white" />
      </g>

      {/* Mouth */}
      <path d="M93 113 Q100 118 107 113" stroke="#C06060" strokeWidth="2" fill="none" strokeLinecap="round" />
      {(isHappy || isWorking) && (
        <path d="M95 115 Q100 120 105 115" stroke="#C06060" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}

      <ellipse cx="79" cy="97" rx="7" ry="4" fill="rgba(255,150,100,0.25)" />
      <ellipse cx="121" cy="97" rx="7" ry="4" fill="rgba(255,150,100,0.25)" />
    </svg>
  );
}

// Animated 3D-style Rabbit SVG
function RabbitSVG({ mood, animate, size }: { mood: string; animate: boolean; size: number }) {
  const isWorking = mood === 'working';
  const isHappy = mood === 'happy';
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rabBody" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#E8E0D8" />
          <stop offset="100%" stopColor="#C0B8B0" />
        </radialGradient>
        <radialGradient id="rabFace" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F0EAE4" />
          <stop offset="100%" stopColor="#D0C8C0" />
        </radialGradient>
        <filter id="rabShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="3" dy="5" stdDeviation="4" floodOpacity="0.25" />
        </filter>
      </defs>

      <ellipse cx="100" cy="188" rx="45" ry="8" fill="rgba(0,0,0,0.12)" />

      {/* Body */}
      <ellipse cx="100" cy="148" rx="38" ry="33" fill="url(#rabBody)" filter="url(#rabShadow)" />

      {/* Fluffy tail */}
      <circle cx="138" cy="155" r="12" fill="white" />

      {/* Legs */}
      <rect x="75" y="163" width="16" height="25" rx="8" fill="#C8C0B8" />
      <rect x="109" y="163" width="16" height="25" rx="8" fill="#C8C0B8" />
      <ellipse cx="83" cy="188" rx="11" ry="6" fill="#B0A8A0" />
      <ellipse cx="117" cy="188" rx="11" ry="6" fill="#B0A8A0" />

      {/* Head */}
      <circle cx="100" cy="93" r="36" fill="url(#rabFace)" filter="url(#rabShadow)" />

      {/* Long ears */}
      <g style={animate && isHappy ? { animation: 'earWiggle 0.6s ease-in-out infinite', transformOrigin: '82px 65px' } : {}}>
        <ellipse cx="82" cy="52" rx="13" ry="30" fill="#D8D0C8" />
        <ellipse cx="82" cy="52" rx="7" ry="23" fill="#F0B0B0" />
      </g>
      <g style={animate && isHappy ? { animation: 'earWiggle 0.6s ease-in-out infinite', animationDelay: '0.15s', transformOrigin: '118px 65px' } : {}}>
        <ellipse cx="118" cy="52" rx="13" ry="30" fill="#D8D0C8" />
        <ellipse cx="118" cy="52" rx="7" ry="23" fill="#F0B0B0" />
      </g>

      {/* Snout */}
      <ellipse cx="100" cy="107" rx="17" ry="12" fill="#F5EEE8" />

      {/* Nose */}
      <ellipse cx="100" cy="103" rx="6" ry="4" fill="#E888A8" />

      {/* Whiskers */}
      <line x1="72" y1="106" x2="86" y2="107" stroke="#aaa" strokeWidth="1.2" />
      <line x1="72" y1="111" x2="86" y2="109" stroke="#aaa" strokeWidth="1.2" />
      <line x1="114" y1="107" x2="128" y2="106" stroke="#aaa" strokeWidth="1.2" />
      <line x1="114" y1="109" x2="128" y2="111" stroke="#aaa" strokeWidth="1.2" />

      {/* Eyes */}
      <g style={animate ? { animation: 'eyeBlink 4.5s ease-in-out infinite' } : {}}>
        <circle cx="85" cy="88" r="8" fill="#C04060" />
        <circle cx="115" cy="88" r="8" fill="#C04060" />
        <circle cx="83" cy="86" r="2.5" fill="white" />
        <circle cx="113" cy="86" r="2.5" fill="white" />
      </g>

      {/* Mouth */}
      <path d="M93 113 Q100 119 107 113" stroke="#C06080" strokeWidth="2" fill="none" strokeLinecap="round" />
      {(isHappy || isWorking) && (
        <path d="M95 115 Q100 121 105 115" stroke="#C06080" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}

      <ellipse cx="80" cy="97" rx="7" ry="4" fill="rgba(255,150,180,0.3)" />
      <ellipse cx="120" cy="97" rx="7" ry="4" fill="rgba(255,150,180,0.3)" />
    </svg>
  );
}

export default function PetMascot({ pet, mood = 'happy', size = 'md', animate = true }: PetMascotProps) {
  const px = sizes[size];
  const animClass = animate
    ? mood === 'working' ? 'pet-bounce' : mood === 'tired' ? 'pet-breathe' : 'pet-float'
    : '';

  const renderPet = () => {
    if (!pet) return <DogSVG mood={mood} animate={animate} size={px} />;
    if (pet === 'dog') return <DogSVG mood={mood} animate={animate} size={px} />;
    if (pet === 'cat') return <CatSVG mood={mood} animate={animate} size={px} />;
    return <RabbitSVG mood={mood} animate={animate} size={px} />;
  };

  return (
    <div className={animClass} style={{ display: 'inline-block', lineHeight: 0 }}>
      {renderPet()}
    </div>
  );
}
