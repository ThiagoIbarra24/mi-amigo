import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Inicio from './pages/Inicio';
import Emociones from './pages/Emociones';
import MascotaSeleccion from './pages/MascotaSeleccion';
import Menu from './pages/Menu';
import Rutina from './pages/Rutina';
import RutinaTimer from './pages/RutinaTimer';
import Minijuegos from './pages/Minijuegos';
import JuegoComparar from './pages/JuegoComparar';
import Configuracion from './pages/Configuracion';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-50 px-8 text-center gap-6">
      <span className="text-7xl">🐾</span>
      <div>
        <h2 className="text-2xl font-black text-gray-700">Página no encontrada</h2>
        <p className="text-gray-400 font-semibold mt-1">Ups, parece que te perdiste</p>
      </div>
      <a href="/menu" className="btn-primary" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
        Volver al menú
      </a>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="phone-frame no-scrollbar">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/emociones" element={<Emociones />} />
            <Route path="/mascota-seleccion" element={<MascotaSeleccion />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/rutina" element={<Rutina />} />
            <Route path="/rutina/:id" element={<RutinaTimer />} />
            <Route path="/minijuegos" element={<Minijuegos />} />
            <Route path="/juego/comparar" element={<JuegoComparar />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
