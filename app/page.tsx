'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  size: number;
  velocity: { x: number; y: number };
  lifetime: number;
}

interface GalleryItem {
  title: string;
  description: string;
  icon: string;
}

export default function HomePage() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const symbols = '◈◇◆⬡⬢'.split('');
  const colors = isDarkMode 
    ? ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
    : ['#FF3333', '#2C7A73', '#1E5163', '#437C68', '#FFB302'];

  const galleryItems: GalleryItem[] = [
    {
      title: "Artificial Intelligence",
      description: "Building cutting-edge AI systems and pushing the boundaries of what's possible with machine learning.",
      icon: "🤖"
    },
    {
      title: "Faith & Spirituality",
      description: "Deepening my relationship with God through daily prayer and meditation.",
      icon: "🙏"
    },
    {
      title: "Economics",
      description: "Studying market dynamics and their impact on technology and society.",
      icon: "📊"
    },
    {
      title: "Research",
      description: "Reading and analyzing academic papers in AI, economics, and technology.",
      icon: "📚"
    },
    {
      title: "Innovation",
      description: "Leading Agora Labs and developing new frameworks for AI development.",
      icon: "💡"
    },
    {
      title: "Open Source",
      description: "Contributing to and maintaining open source projects in the AI community.",
      icon: "🌐"
    }
  ];

  const createParticle = useCallback((x: number, y: number): Particle => ({
    id: Math.random(),
    x,
    y,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 1.2 + 0.8,
    velocity: {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    },
    lifetime: 0
  }), [colors]);

  const updateContainerSize = useCallback(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, []);

  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const spawnCount = window.innerWidth < 768 ? 3 : 2;

    setParticles(prev => [
      ...prev,
      ...Array(spawnCount).fill(null).map(() => createParticle(x, y))
    ]);
  }, [createParticle]);

  const updateParticles = useCallback(() => {
    setParticles(prev => {
      const updated = prev
        .map(particle => {
          let newVelX = particle.velocity.x;
          let newVelY = particle.velocity.y;
          let newX = particle.x + newVelX;
          let newY = particle.y + newVelY;

          if (newX < 0 || newX > containerSize.width) {
            newX = Math.max(0, Math.min(containerSize.width, newX));
            newVelX *= -0.8;
          }
          if (newY < 0 || newY > containerSize.height) {
            newY = Math.max(0, Math.min(containerSize.height, newY));
            newVelY *= -0.8;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            velocity: { x: newVelX * 0.99, y: newVelY * 0.99 },
            lifetime: particle.lifetime + 1
          };
        })
        .filter(particle => particle.lifetime < 200);

      const maxParticles = window.innerWidth < 768 ? 30 : 50;
      return updated.slice(-maxParticles);
    });

    frameRef.current = requestAnimationFrame(updateParticles);
  }, [containerSize]);

  useEffect(() => {
    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [updateContainerSize]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(updateParticles);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updateParticles]);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-4 right-4 z-20 px-4 py-2 rounded-full transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-white text-black hover:bg-gray-200' 
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>

      {/* Background Animation */}
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden touch-none"
        style={{ zIndex: 0 }}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
      >
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute transition-transform duration-75"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              color: particle.color,
              transform: `scale(${particle.size})`,
              opacity: Math.max(0, 1 - particle.lifetime / 200),
              fontSize: window.innerWidth < 768 ? '1.25rem' : '1.5rem',
            }}
          >
            {particle.symbol}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
          <h1 className={`text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'} tracking-tight`}>
            Kye Gomez
          </h1>

          <p className="text-lg sm:text-xl mb-12 max-w-3xl">
            Neural architect and spiritual seeker, building the future of AI while staying grounded in faith and economics.
          </p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg border transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-black/50 border-red-400/30 hover:border-red-400/50' 
                    : 'bg-white/50 border-red-600/30 hover:border-red-600/50'
                }`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base opacity-80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* About Section */}
          <section className="mt-16 mb-8">
            <h2 className={`text-2xl sm:text-3xl font-semibold mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              About Me
            </h2>
            <p className="text-sm sm:text-base mb-4">
              I've been programming since I was 12 years old, and today, I lead Agora, 
              an open-source AI research lab non-profit with over 8,200 researchers worldwide.
            </p>
            <p className="text-sm sm:text-base">
              My journey combines technological innovation with spiritual growth, 
              economic understanding, and a commitment to advancing AI for the benefit of humanity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
