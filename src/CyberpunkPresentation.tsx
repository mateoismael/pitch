import React, { useState, useEffect } from 'react';

export default function CyberpunkPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 9;

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev + 1) % totalSlides;
      console.log('Next slide:', prev, '->', next);
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const previous = (prev - 1 + totalSlides) % totalSlides;
      console.log('Prev slide:', prev, '->', previous);
      return previous;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + 9) % 9);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % 9);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-mono">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute inset-0 animate-pulse ${currentSlide <= 3 ? 'bg-gradient-to-br from-red-900 via-black to-red-950' : 'bg-gradient-to-br from-green-900 via-black to-green-950'}`}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: currentSlide <= 3
            ? 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.03) 2px, rgba(255, 0, 0, 0.03) 4px)'
            : 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
          animation: 'scan 8s linear infinite'
        }}></div>
      </div>

      {/* Slide Counter */}
      <div className={`absolute top-3 right-3 sm:top-6 sm:right-6 z-50 text-sm sm:text-xl font-bold border-2 px-2 py-1 sm:px-4 sm:py-2 bg-black bg-opacity-80 ${
        currentSlide <= 3 ? 'text-red-500 border-red-500' : 'text-green-400 border-green-400'
      }`}
           style={{ textShadow: currentSlide <= 3 ? '0 0 10px rgba(255, 0, 0, 0.8)' : '0 0 10px rgba(0, 255, 0, 0.8)' }}>
        <span className={currentSlide <= 3 ? 'text-red-400' : 'text-green-300'}>{currentSlide + 1}</span> / {totalSlides}
      </div>

      {/* Slides Container */}
      <div className="relative w-full h-full flex items-center justify-center pb-24 sm:pb-28">
        {currentSlide === 0 && <Slide1 />}
        {currentSlide === 1 && <Slide2 />}
        {currentSlide === 2 && <Slide3 />}
        {currentSlide === 3 && <Slide4 />}
        {currentSlide === 4 && <Slide5 />}
        {currentSlide === 5 && <Slide6 />}
        {currentSlide === 6 && <Slide7 />}
        {currentSlide === 7 && <Slide8 />}
        {currentSlide === 8 && <Slide9 />}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-4">
        <button
          onClick={prevSlide}
          className={`px-3 py-2 sm:px-6 sm:py-3 bg-black border-2 text-xs sm:text-base font-bold transition-all duration-300 ${
            currentSlide <= 3
              ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-black'
              : 'border-green-400 text-green-400 hover:bg-green-400 hover:text-black'
          }`}
          style={{ textShadow: currentSlide <= 3 ? '0 0 10px rgba(255, 0, 0, 0.8)' : '0 0 10px rgba(0, 255, 0, 0.8)' }}
        >
          ANTERIOR
        </button>

        <div className="flex gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 border-2 transition-all duration-300 ${
                currentSlide <= 3
                  ? currentSlide === index
                    ? 'bg-red-500 border-red-500'
                    : 'bg-transparent border-red-500'
                  : currentSlide === index
                    ? 'bg-green-400 border-green-400'
                    : 'bg-transparent border-green-400'
              }`}
              style={{
                boxShadow: currentSlide === index
                  ? currentSlide <= 3
                    ? '0 0 10px rgba(255, 0, 0, 0.8)'
                    : '0 0 10px rgba(0, 255, 0, 0.8)'
                  : 'none'
              }}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className={`px-3 py-2 sm:px-6 sm:py-3 bg-black border-2 text-xs sm:text-base font-bold transition-all duration-300 ${
            currentSlide <= 3
              ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-black'
              : 'border-green-400 text-green-400 hover:bg-green-400 hover:text-black'
          }`}
          style={{ textShadow: currentSlide <= 3 ? '0 0 10px rgba(255, 0, 0, 0.8)' : '0 0 10px rgba(0, 255, 0, 0.8)' }}
        >
          SIGUIENTE
        </button>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }
        
        @keyframes pulse-thought {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes notification-pop {
          0% { transform: scale(0) translateY(0); opacity: 0; }
          50% { transform: scale(1.2) translateY(-10px); opacity: 1; }
          100% { transform: scale(1) translateY(-20px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

function Slide1() {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-4">
      {/* Phi Symbol (Georgia) */}
      <div className="text-red-500 text-[200px] sm:text-[250px] md:text-[300px] lg:text-[350px] animate-pulse"
           style={{
             fontFamily: 'Georgia, serif',
             textShadow: '0 0 30px rgba(255, 0, 0, 0.8), 0 0 60px rgba(255, 0, 0, 0.5), 0 0 90px rgba(255, 0, 0, 0.3)',
             animation: 'float 4s ease-in-out infinite'
           }}>
        φ
      </div>
    </div>
  );
}

function Slide2() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 gap-6 sm:gap-8 pt-12 sm:pt-16 md:pt-20 lg:pt-24">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-500 animate-pulse text-center shrink-0"
          style={{
            textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.5)',
            animation: 'glitch 3s infinite'
          }}>
        SOBRECARGA COGNITIVA
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16 flex-1 max-h-full overflow-hidden">
        {/* Brain Container */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 shrink-0">
          {/* Brain Outline */}
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'float 3s ease-in-out infinite' }}>
            <path
              d="M100,40 Q120,40 130,50 Q140,60 140,70 Q150,75 150,85 Q150,100 145,110 Q140,120 140,130 Q135,145 125,155 Q115,165 100,165 Q85,165 75,155 Q65,145 60,130 Q60,120 55,110 Q50,100 50,85 Q50,75 60,70 Q60,60 70,50 Q80,40 100,40 Z"
              fill="none"
              stroke="#ff0000"
              strokeWidth="3"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.8))' }}
            />
          </svg>

          {/* Overloaded Thoughts */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-500 font-bold text-xs sm:text-sm"
              style={{
                top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 80}px`,
                left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 80}px`,
                animation: `pulse-thought ${1 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
                textShadow: '0 0 5px rgba(255, 0, 0, 0.8)'
              }}
            >
              {['DATOS', 'INFO', 'TAREA', 'ALERTA', 'RUIDO', 'ESTRÉS', 'INPUT', 'SEÑAL', 'ERROR', 'PING', 'CARGA', 'FLUJO'][i]}
            </div>
          ))}

          {/* Central Glitch Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-red-500 text-2xl sm:text-3xl md:text-4xl font-bold"
                 style={{
                   textShadow: '0 0 20px rgba(255, 0, 0, 1)',
                   animation: 'glitch 0.5s infinite'
                 }}>
              !
            </div>
          </div>
        </div>

        {/* Phone Container */}
        <div className="relative shrink-0">
          {/* Phone Body */}
          <div className="w-32 h-56 sm:w-36 sm:h-64 md:w-40 md:h-72 lg:w-48 lg:h-80 xl:w-56 xl:h-96 bg-black border-2 sm:border-4 border-red-500 rounded-3xl relative overflow-hidden"
               style={{ boxShadow: '0 0 30px rgba(255, 0, 0, 0.6)' }}>

            {/* Phone Screen */}
            <div className="absolute inset-2 sm:inset-4 bg-gray-900 rounded-2xl overflow-hidden">
              {/* Status Bar */}
              <div className="h-6 sm:h-8 bg-red-950 flex items-center justify-between px-2 sm:px-4 border-b border-red-500">
                <span className="text-red-500 text-[10px] sm:text-xs">12:34</span>
                <span className="text-red-500 text-[10px] sm:text-xs">99+</span>
              </div>

              {/* Notification Stream */}
              <div className="relative h-full overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full px-1 sm:px-2"
                    style={{
                      top: `${i * 50}px`,
                      animation: `notification-pop ${2 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  >
                    <div className="bg-red-950 border border-red-500 p-1 sm:p-2 mb-1 sm:mb-2 rounded"
                         style={{ boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)' }}>
                      <div className="text-red-500 text-[9px] sm:text-xs font-bold">
                        {['MENSAJE', 'ALERTA', 'ACTUALIZACIÓN', 'ME GUSTA', 'COMENTARIO', 'ETIQUETA', 'SEGUIR', 'COMPARTIR', 'MENCIÓN', 'SOLICITUD', 'RECORDATORIO', 'NOTICIAS', 'PROMO', 'PING', 'NOTIF'][i]}
                      </div>
                      <div className="text-red-400 text-[8px] sm:text-xs mt-0.5 sm:mt-1">Nueva actividad detectada...</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Button */}
            <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-0.5 sm:h-1 bg-red-500 rounded-full"
                 style={{ boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)' }}></div>
          </div>

          {/* Floating Notification Icons */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-500 text-lg sm:text-xl md:text-2xl font-bold hidden sm:block"
              style={{
                top: `${Math.random() * 400}px`,
                left: `${-50 + i * 50}px`,
                animation: `pulse-thought ${1.5 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
                textShadow: '0 0 10px rgba(255, 0, 0, 0.8)'
              }}
            >
              {['!', '@', '#', '*', '+', '>', '!', '?'][i]}
            </div>
          ))}
        </div>
      </div>

      <p className="text-red-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl px-4 shrink-0"
         style={{ textShadow: '0 0 10px rgba(255, 0, 0, 0.5)' }}>
        ATENCIÓN LIMITADA // BOMBARDEO DE ESTÍMULOS
      </p>
    </div>
  );
}

function Slide3() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 gap-4 sm:gap-6 py-8 sm:py-12">
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 flex-1 max-h-full overflow-hidden">
        {/* Frustrated Student Figure */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] shrink-0">
          {/* Student at desk */}
          <svg viewBox="0 0 400 400" className="w-full h-full" style={{ animation: 'glitch 2s infinite' }}>
            {/* Desk */}
            <rect x="50" y="280" width="300" height="15" fill="none" stroke="#ff0000" strokeWidth="4"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.8))' }} />
            <line x1="80" y1="295" x2="80" y2="380" stroke="#ff0000" strokeWidth="4" />
            <line x1="320" y1="295" x2="320" y2="380" stroke="#ff0000" strokeWidth="4" />

            {/* Book/Laptop on desk */}
            <rect x="140" y="250" width="120" height="25" fill="none" stroke="#ff0000" strokeWidth="3"
                  rx="3" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))' }} />
            {/* Pages/screen lines */}
            <line x1="150" y1="257" x2="250" y2="257" stroke="#ff0000" strokeWidth="1.5" opacity="0.6" />
            <line x1="150" y1="262" x2="250" y2="262" stroke="#ff0000" strokeWidth="1.5" opacity="0.6" />
            <line x1="150" y1="267" x2="250" y2="267" stroke="#ff0000" strokeWidth="1.5" opacity="0.6" />

            {/* Backpack beside desk */}
            <path d="M 330 270 L 340 270 L 345 290 L 325 290 Z" fill="none" stroke="#ff0000" strokeWidth="2.5" />
            <line x1="332" y1="275" x2="338" y2="275" stroke="#ff0000" strokeWidth="2" />

            {/* Student body sitting */}
            <line x1="200" y1="160" x2="200" y2="250" stroke="#ff0000" strokeWidth="4" />

            {/* Head with frustration */}
            <circle cx="200" cy="120" r="40" fill="none" stroke="#ff0000" strokeWidth="4"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(255, 0, 0, 0.8))' }} />

            {/* Frustrated eyes (X X) */}
            <line x1="185" y1="110" x2="195" y2="120" stroke="#ff0000" strokeWidth="4" strokeLinecap="round" />
            <line x1="195" y1="110" x2="185" y2="120" stroke="#ff0000" strokeWidth="4" strokeLinecap="round" />
            <line x1="205" y1="110" x2="215" y2="120" stroke="#ff0000" strokeWidth="4" strokeLinecap="round" />
            <line x1="215" y1="110" x2="205" y2="120" stroke="#ff0000" strokeWidth="4" strokeLinecap="round" />

            {/* Frustrated mouth (downward arc) */}
            <path d="M 180 140 Q 200 130 220 140" fill="none" stroke="#ff0000" strokeWidth="3" />

            {/* Arms - one hand on head (frustration) */}
            <path d="M 200 180 Q 160 150 140 120" stroke="#ff0000" strokeWidth="4" fill="none" />
            <circle cx="140" cy="120" r="10" fill="#ff0000" opacity="0.7" />

            {/* Other arm resting on desk */}
            <path d="M 200 180 Q 240 200 250 250" stroke="#ff0000" strokeWidth="4" fill="none" />
            <circle cx="250" cy="250" r="8" fill="#ff0000" opacity="0.6" />

            {/* Legs under desk */}
            <line x1="190" y1="250" x2="180" y2="320" stroke="#ff0000" strokeWidth="4" />
            <line x1="210" y1="250" x2="220" y2="320" stroke="#ff0000" strokeWidth="4" />

            {/* Coffee cup on desk */}
            <rect x="100" y="260" width="20" height="15" fill="none" stroke="#ff0000" strokeWidth="2" rx="2" />
            <line x1="95" y1="265" x2="88" y2="268" stroke="#ff0000" strokeWidth="2" />
          </svg>

          {/* Stress symbols floating around */}
          {[...Array(8)].map((_, i) => {
            const positions = [
              { top: '15%', left: '0%' },
              { top: '30%', left: '10%' },
              { top: '20%', left: '25%' },
              { top: '40%', left: '35%' },
              { top: '25%', left: '50%' },
              { top: '35%', left: '65%' },
              { top: '15%', left: '75%' },
              { top: '30%', left: '90%' }
            ];
            return (
              <div
                key={i}
                className="absolute text-red-500 font-bold text-lg sm:text-xl md:text-2xl"
                style={{
                  top: positions[i].top,
                  left: positions[i].left,
                  animation: `pulse-thought ${1.2 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                  textShadow: '0 0 10px rgba(255, 0, 0, 0.8)'
                }}
              >
                {['⚠', '✗', '!', '?', '⚡', '✗', '!', '⚠'][i]}
              </div>
            );
          })}
        </div>

        {/* Book/laptop on desk */}
        <div className="relative w-48 h-32 sm:w-56 sm:h-36 md:w-64 md:h-40">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Laptop/Book */}
            <rect x="40" y="40" width="120" height="50" fill="none" stroke="#ff0000" strokeWidth="3"
                  rx="5" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.6))' }} />

            {/* Screen lines (representing overwhelming content) */}
            {[...Array(6)].map((_, i) => (
              <line key={i} x1="50" y1={50 + i * 7} x2="150" y2={50 + i * 7}
                    stroke="#ff0000" strokeWidth="1.5" opacity="0.6" />
            ))}
          </svg>
        </div>
      </div>

      <p className="text-red-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl px-4 shrink-0"
         style={{ textShadow: '0 0 10px rgba(255, 0, 0, 0.5)' }}>
        ABRUMADO // SIN CONCENTRACIÓN
      </p>
    </div>
  );
}

function Slide4() {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 xl:gap-20">

        {/* 1. EAR (Oreja) */}
        <div className="flex flex-col items-center gap-4">
          <svg viewBox="0 0 200 200" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
               style={{ animation: 'float 3s ease-in-out infinite' }}>
            {/* Outer ear */}
            <path d="M 120 50 Q 150 50 160 80 Q 165 110 155 140 Q 145 160 120 165 Q 100 160 90 140 L 95 130 Q 100 145 120 148 Q 135 145 142 130 Q 148 110 145 85 Q 140 65 120 65 Q 100 70 95 85 L 90 80 Q 95 60 120 50 Z"
                  fill="none" stroke="#ff0000" strokeWidth="4"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.8))' }} />

            {/* Inner ear canal */}
            <ellipse cx="115" cy="105" rx="18" ry="25" fill="none" stroke="#ff0000" strokeWidth="3"
                     style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))' }} />

            {/* Ear details */}
            <path d="M 105 95 Q 110 100 105 110" fill="none" stroke="#ff0000" strokeWidth="2" />
            <path d="M 125 95 Q 120 105 122 115" fill="none" stroke="#ff0000" strokeWidth="2" />

            {/* Sound waves */}
            <path d="M 170 90 Q 175 100 170 110" fill="none" stroke="#ff0000" strokeWidth="2" opacity="0.7" />
            <path d="M 180 80 Q 187 100 180 120" fill="none" stroke="#ff0000" strokeWidth="2" opacity="0.5" />
            <path d="M 190 70 Q 200 100 190 130" fill="none" stroke="#ff0000" strokeWidth="2" opacity="0.3" />
          </svg>
          <span className="text-red-500 text-sm sm:text-base font-bold"
                style={{ textShadow: '0 0 10px rgba(255, 0, 0, 0.8)' }}>
            ESCUCHAR
          </span>
        </div>

        {/* 2. PENCIL + PAPER (Lápiz con papel) */}
        <div className="flex flex-col items-center gap-4">
          <svg viewBox="0 0 200 200" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
               style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}>
            {/* Paper */}
            <rect x="40" y="50" width="120" height="140" fill="none" stroke="#ff0000" strokeWidth="3"
                  rx="3" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.8))' }} />

            {/* Lines on paper */}
            <line x1="55" y1="75" x2="145" y2="75" stroke="#ff0000" strokeWidth="2" opacity="0.6" />
            <line x1="55" y1="95" x2="145" y2="95" stroke="#ff0000" strokeWidth="2" opacity="0.6" />
            <line x1="55" y1="115" x2="145" y2="115" stroke="#ff0000" strokeWidth="2" opacity="0.6" />
            <line x1="55" y1="135" x2="120" y2="135" stroke="#ff0000" strokeWidth="2" opacity="0.6" />

            {/* Pencil */}
            <g transform="rotate(-45 150 150)">
              {/* Pencil body */}
              <rect x="120" y="130" width="60" height="12" fill="none" stroke="#ff0000" strokeWidth="3"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.7))' }} />

              {/* Pencil tip */}
              <polygon points="180,136 195,136 187.5,142" fill="none" stroke="#ff0000" strokeWidth="3" />

              {/* Eraser */}
              <rect x="115" y="130" width="5" height="12" fill="#ff0000" opacity="0.4" stroke="#ff0000" strokeWidth="2" />

              {/* Pencil details */}
              <line x1="130" y1="130" x2="130" y2="142" stroke="#ff0000" strokeWidth="1.5" opacity="0.5" />
              <line x1="145" y1="130" x2="145" y2="142" stroke="#ff0000" strokeWidth="1.5" opacity="0.5" />
              <line x1="160" y1="130" x2="160" y2="142" stroke="#ff0000" strokeWidth="1.5" opacity="0.5" />
            </g>
          </svg>
          <span className="text-red-500 text-sm sm:text-base font-bold"
                style={{ textShadow: '0 0 10px rgba(255, 0, 0, 0.8)' }}>
            ANOTAR
          </span>
        </div>

        {/* 3. BRAIN (Cerebro) */}
        <div className="flex flex-col items-center gap-4">
          <svg viewBox="0 0 200 200" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
               style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1s' }}>
            {/* Brain outline */}
            <path d="M 100 50 Q 120 45 135 55 Q 145 60 148 70 Q 155 75 158 85 Q 160 100 155 115 Q 150 130 145 140 Q 138 150 125 158 Q 115 163 100 163 Q 85 163 75 158 Q 62 150 55 140 Q 50 130 45 115 Q 40 100 42 85 Q 45 75 52 70 Q 55 60 65 55 Q 80 45 100 50 Z"
                  fill="none" stroke="#ff0000" strokeWidth="4"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.8))' }} />

            {/* Brain wrinkles/folds (left hemisphere) */}
            <path d="M 70 80 Q 75 90 70 100" fill="none" stroke="#ff0000" strokeWidth="2.5" />
            <path d="M 60 95 Q 65 105 60 115" fill="none" stroke="#ff0000" strokeWidth="2.5" />
            <path d="M 75 110 Q 80 120 75 130" fill="none" stroke="#ff0000" strokeWidth="2.5" />
            <path d="M 85 125 Q 90 135 85 145" fill="none" stroke="#ff0000" strokeWidth="2.5" />

            {/* Brain wrinkles/folds (right hemisphere) */}
            <path d="M 130 80 Q 125 90 130 100" fill="none" stroke="#ff0000" strokeWidth="2.5" />
            <path d="M 140 95 Q 135 105 140 115" fill="none" stroke="#ff0000" strokeWidth="2.5" />
            <path d="M 125 110 Q 120 120 125 130" fill="none" stroke="#ff0000" strokeWidth="2.5" />
            <path d="M 115 125 Q 110 135 115 145" fill="none" stroke="#ff0000" strokeWidth="2.5" />

            {/* Center line dividing hemispheres */}
            <line x1="100" y1="55" x2="100" y2="160" stroke="#ff0000" strokeWidth="2" opacity="0.5" />

            {/* Synaptic activity sparkles */}
            <circle cx="80" cy="90" r="3" fill="#ff0000" opacity="0.8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="120" cy="95" r="3" fill="#ff0000" opacity="0.8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="95" cy="120" r="3" fill="#ff0000" opacity="0.8">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </svg>
          <span className="text-red-500 text-sm sm:text-base font-bold"
                style={{ textShadow: '0 0 10px rgba(255, 0, 0, 0.8)' }}>
            ENTENDER
          </span>
        </div>

      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 gap-2 sm:gap-3 md:gap-4 pb-22 sm:pb-24">
      {/* Phi Symbol (Georgia) - Smaller */}
      <div className="text-green-400 text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] animate-pulse"
           style={{
             fontFamily: 'Georgia, serif',
             textShadow: '0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.5)',
             animation: 'float 4s ease-in-out infinite'
           }}>
        φ
      </div>

      {/* Phia text - Larger and centered */}
      <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[180px] font-bold text-green-400 text-center"
          style={{
            fontFamily: 'Georgia, serif',
            textShadow: '0 0 30px rgba(0, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.5), 0 0 90px rgba(0, 255, 0, 0.3)',
            animation: 'glitch 3s infinite'
          }}>
        Phia
      </h2>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-green-300 text-center mt-2 sm:mt-3"
         style={{ textShadow: '0 0 10px rgba(0, 255, 0, 0.5)' }}>
        Tu copiloto de clases
      </p>
    </div>
  );
}

function Slide6() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 py-6 sm:py-8 gap-4 sm:gap-6 pt-16 sm:pt-20">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 max-w-7xl flex-1">

        {/* 1. Estudiantes */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <svg viewBox="0 0 200 200" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
               style={{ animation: 'float 3s ease-in-out infinite' }}>
            {/* Group of people */}
            <circle cx="70" cy="80" r="20" fill="none" stroke="#00ff00" strokeWidth="3"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.7))' }} />
            <path d="M 50 100 Q 70 110 90 100 L 90 140 L 50 140 Z" fill="none" stroke="#00ff00" strokeWidth="3" />

            <circle cx="130" cy="75" r="22" fill="none" stroke="#00ff00" strokeWidth="3"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.7))' }} />
            <path d="M 108 98 Q 130 110 152 98 L 152 145 L 108 145 Z" fill="none" stroke="#00ff00" strokeWidth="3" />

            <circle cx="100" cy="120" r="18" fill="none" stroke="#00ff00" strokeWidth="2.5" opacity="0.7" />
            <path d="M 82 138 Q 100 148 118 138 L 118 175 L 82 175 Z" fill="none" stroke="#00ff00" strokeWidth="2.5" opacity="0.7" />
          </svg>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-400"
                 style={{ textShadow: '0 0 20px rgba(0, 255, 0, 0.8)' }}>
              264M
            </div>
            <div className="text-xs sm:text-sm md:text-base text-green-300 mt-1 sm:mt-2"
                 style={{ textShadow: '0 0 10px rgba(0, 255, 0, 0.5)' }}>
              Estudiantes<br/>Globalmente
            </div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-green-300 mt-2 opacity-60"
                 style={{ textShadow: '0 0 5px rgba(0, 255, 0, 0.3)' }}>
              UNESCO
            </div>
          </div>
        </div>

        {/* 2. EdTech Market */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <svg viewBox="0 0 200 200" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
               style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}>
            {/* Growth chart */}
            <line x1="40" y1="160" x2="40" y2="60" stroke="#00ff00" strokeWidth="3"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.7))' }} />
            <line x1="40" y1="160" x2="160" y2="160" stroke="#00ff00" strokeWidth="3"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 0, 0.7))' }} />

            {/* Upward trending bars */}
            <rect x="60" y="130" width="20" height="30" fill="none" stroke="#00ff00" strokeWidth="2.5" />
            <rect x="90" y="110" width="20" height="50" fill="none" stroke="#00ff00" strokeWidth="2.5" />
            <rect x="120" y="80" width="20" height="80" fill="none" stroke="#00ff00" strokeWidth="2.5" />

            {/* Arrow up */}
            <path d="M 150 70 L 160 50 L 170 70" fill="none" stroke="#00ff00" strokeWidth="3"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.8))' }} />
            <line x1="160" y1="50" x2="160" y2="90" stroke="#00ff00" strokeWidth="3" />
          </svg>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-400"
                 style={{ textShadow: '0 0 20px rgba(0, 255, 0, 0.8)' }}>
              $404B
            </div>
            <div className="text-xs sm:text-sm md:text-base text-green-300 mt-1 sm:mt-2"
                 style={{ textShadow: '0 0 10px rgba(0, 255, 0, 0.5)' }}>
              EdTech Market<br/>2025
            </div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-green-300 mt-2 opacity-60"
                 style={{ textShadow: '0 0 5px rgba(0, 255, 0, 0.3)' }}>
              HolonIQ
            </div>
          </div>
        </div>

        {/* 3. Speech-to-Text APIs */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <svg viewBox="0 0 200 200" className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
               style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1s' }}>
            {/* Microphone */}
            <rect x="85" y="80" width="30" height="50" rx="15" fill="none" stroke="#00ff00" strokeWidth="3"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.8))' }} />
            <line x1="100" y1="130" x2="100" y2="155" stroke="#00ff00" strokeWidth="3" />
            <line x1="80" y1="155" x2="120" y2="155" stroke="#00ff00" strokeWidth="3" />

            {/* Sound waves */}
            <path d="M 130 90 Q 140 100 130 110" fill="none" stroke="#00ff00" strokeWidth="2.5" opacity="0.7" />
            <path d="M 145 80 Q 160 100 145 120" fill="none" stroke="#00ff00" strokeWidth="2.5" opacity="0.5" />
            <path d="M 70 90 Q 60 100 70 110" fill="none" stroke="#00ff00" strokeWidth="2.5" opacity="0.7" />
            <path d="M 55 80 Q 40 100 55 120" fill="none" stroke="#00ff00" strokeWidth="2.5" opacity="0.5" />

            {/* Grill lines */}
            <line x1="90" y1="95" x2="110" y2="95" stroke="#00ff00" strokeWidth="1.5" opacity="0.6" />
            <line x1="90" y1="105" x2="110" y2="105" stroke="#00ff00" strokeWidth="1.5" opacity="0.6" />
            <line x1="90" y1="115" x2="110" y2="115" stroke="#00ff00" strokeWidth="1.5" opacity="0.6" />
          </svg>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-400"
                 style={{ textShadow: '0 0 20px rgba(0, 255, 0, 0.8)' }}>
              $8.5B
            </div>
            <div className="text-xs sm:text-sm md:text-base text-green-300 mt-1 sm:mt-2"
                 style={{ textShadow: '0 0 10px rgba(0, 255, 0, 0.5)' }}>
              Speech-to-Text<br/>APIs 2030
            </div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-green-300 mt-2 opacity-60"
                 style={{ textShadow: '0 0 5px rgba(0, 255, 0, 0.3)' }}>
              Grand View Research
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Slide7() {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-7xl w-full">
        {/* Screenshot 1 - Left */}
        <div className="w-full lg:w-1/5 max-w-xs border-2 border-green-400 rounded-lg overflow-hidden"
             style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.6)' }}>
          <img
            src="/sss/Captura de pantalla 2025-10-03 015104.png"
            alt="Screenshot 1"
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.4))' }}
          />
        </div>

        {/* Screenshot 2 - Center (Larger) */}
        <div className="w-full lg:w-2/5 max-w-2xl border-2 border-green-400 rounded-lg overflow-hidden"
             style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.6)' }}>
          <img
            src="/sss/medio.png"
            alt="Screenshot 2"
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.4))' }}
          />
        </div>

        {/* Screenshot 3 - Right */}
        <div className="w-full lg:w-1/5 max-w-xs border-2 border-green-400 rounded-lg overflow-hidden"
             style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.6)' }}>
          <img
            src="/sss/Captura de pantalla 2025-10-03 015116.png"
            alt="Screenshot 3"
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.4))' }}
          />
        </div>
      </div>
    </div>
  );
}

function Slide8() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 gap-8 sm:gap-12">
      {/* Main text */}
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-400 text-center"
            style={{
              textShadow: '0 0 30px rgba(0, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.5)',
              animation: 'glitch 3s infinite'
            }}>
          Phia escucha.
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-400 text-center"
            style={{
              textShadow: '0 0 30px rgba(0, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.5)',
              animation: 'glitch 3s infinite'
            }}>
          Phia anota.
        </h1>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-400 text-center"
            style={{
              textShadow: '0 0 30px rgba(0, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.5)',
              animation: 'glitch 3s infinite'
            }}>
          Tú entiendes.
        </h1>
      </div>

      {/* Subtext */}
      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-green-300 text-center"
         style={{ textShadow: '0 0 15px rgba(0, 255, 0, 0.5)' }}>
        ¿Qué sigue?
      </p>
    </div>
  );
}

function Slide9() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 gap-2 sm:gap-3 md:gap-4 pb-22 sm:pb-24">
      {/* Phi Symbol (Georgia) - Smaller */}
      <div className="text-green-400 text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] animate-pulse"
           style={{
             fontFamily: 'Georgia, serif',
             textShadow: '0 0 20px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.5)',
             animation: 'float 4s ease-in-out infinite'
           }}>
        φ
      </div>

      {/* Phia text - Larger and centered */}
      <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[180px] font-bold text-green-400 text-center"
          style={{
            fontFamily: 'Georgia, serif',
            textShadow: '0 0 30px rgba(0, 255, 0, 0.8), 0 0 60px rgba(0, 255, 0, 0.5), 0 0 90px rgba(0, 255, 0, 0.3)',
            animation: 'glitch 3s infinite'
          }}>
        Phia
      </h2>

      {/* Subtitle */}
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-green-300 text-center mt-2 sm:mt-3"
         style={{ textShadow: '0 0 10px rgba(0, 255, 0, 0.5)' }}>
        Tu copiloto de clases
      </p>
    </div>
  );
}