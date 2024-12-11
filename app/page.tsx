'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Genome {
  speed: number;
  size: number;
  agility: number;
  lifespan: number;
  socialDistance: number;
  symbolIndex: number;
}

interface Organism {
  id: number;
  x: number;
  y: number;
  genome: Genome;
  symbol: string;
  color: string;
  velocity: { x: number; y: number };
  energy: number;
  age: number;
}

export default function HomePage() {
  const [organisms, setOrganisms] = useState<Organism[]>([]);
  const [generation, setGeneration] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const symbols = '◈◇◆⬡⬢△▲○●⎔⬣⬤⬦⬥∆∇□■'.split('');
  const colors = isDarkMode 
    ? ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
    : ['#FF3333', '#2C7A73', '#1E5163', '#437C68', '#FFB302'];

  // Create a random genome with mutations
  const createGenome = useCallback((parentGenome?: Genome): Genome => {
    const baseGenome = parentGenome || {
      speed: Math.random() * 2 + 1,
      size: Math.random() * 1 + 0.5,
      agility: Math.random() * 0.8 + 0.2,
      lifespan: Math.random() * 400 + 200,
      socialDistance: Math.random() * 100 + 50,
      symbolIndex: Math.floor(Math.random() * symbols.length)
    };

    if (!parentGenome) return baseGenome;

    // Apply mutations with 20% chance for each trait
    const mutated = { ...baseGenome };
    Object.keys(mutated).forEach(key => {
      if (Math.random() < 0.2) {
        const trait = key as keyof Genome;
        if (trait === 'symbolIndex') {
          mutated[trait] = Math.floor(Math.random() * symbols.length);
        } else {
          mutated[trait] = baseGenome[trait] * (0.8 + Math.random() * 0.4);
        }
      }
    });

    return mutated;
  }, []);

  // Create a new organism with optional parent genome
  const createOrganism = useCallback((x: number, y: number, parentGenome?: Genome): Organism => {
    const genome = createGenome(parentGenome);
    return {
      id: Math.random(),
      x,
      y,
      genome,
      symbol: symbols[genome.symbolIndex],
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * genome.speed,
        y: (Math.random() - 0.5) * genome.speed
      },
      energy: 100,
      age: 0
    };
  }, [colors, createGenome]);

  const updateContainerSize = useCallback(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, []);

  useEffect(() => {
    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [updateContainerSize]);

  // Calculate forces between organisms
  const calculateForces = useCallback((org: Organism, others: Organism[]) => {
    let forceX = 0;
    let forceY = 0;

    others.forEach(other => {
      if (other.id === org.id) return;

      const dx = other.x - org.x;
      const dy = other.y - org.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < org.genome.socialDistance) {
        // Repulsion force when too close
        const repulsionStrength = (org.genome.socialDistance - distance) / org.genome.socialDistance;
        forceX -= (dx / distance) * repulsionStrength;
        forceY -= (dy / distance) * repulsionStrength;
      }
    });

    // Add slight attraction to center to keep organisms in view
    const centerX = containerSize.width / 2;
    const centerY = containerSize.height / 2;
    const centerDx = centerX - org.x;
    const centerDy = centerY - org.y;
    const centerDistance = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
    
    forceX += (centerDx / centerDistance) * 0.1;
    forceY += (centerDy / centerDistance) * 0.1;

    return { x: forceX, y: forceY };
  }, [containerSize]);

  // Handle clicks/touches to spawn new organisms
  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const spawnCount = window.innerWidth < 768 ? 5 : 3;

    setOrganisms(prev => {
      // If there are existing organisms, use their genomes as templates
      const newOrganisms = Array(spawnCount).fill(null).map(() => {
        if (prev.length > 0) {
          const parent = prev[Math.floor(Math.random() * prev.length)];
          return createOrganism(x, y, parent.genome);
        }
        return createOrganism(x, y);
      });
      return [...prev, ...newOrganisms];
    });
    setGeneration(g => g + 1);
  }, [createOrganism]);

  // Update simulation state
  const updateOrganisms = useCallback(() => {
    setOrganisms(prev => {
      const updated = prev
        .map(org => {
          // Calculate forces from other organisms
          const forces = calculateForces(org, prev);
          
          // Update velocity based on forces and organism's agility
          let newVelX = (org.velocity.x + forces.x * org.genome.agility) * 0.99;
          let newVelY = (org.velocity.y + forces.y * org.genome.agility) * 0.99;

          // Update position
          let newX = org.x + newVelX;
          let newY = org.y + newVelY;

          // Bounce off boundaries
          if (newX < 0 || newX > containerSize.width) {
            newX = Math.max(0, Math.min(containerSize.width, newX));
            newVelX *= -0.8;
          }
          if (newY < 0 || newY > containerSize.height) {
            newY = Math.max(0, Math.min(containerSize.height, newY));
            newVelY *= -0.8;
          }

          // Update organism state
          return {
            ...org,
            x: newX,
            y: newY,
            velocity: { x: newVelX, y: newVelY },
            energy: org.energy - (Math.abs(newVelX) + Math.abs(newVelY)) * 0.1,
            age: org.age + 1
          };
        })
        .filter(org => org.age < org.genome.lifespan && org.energy > 0);

      const maxOrganisms = window.innerWidth < 768 ? 75 : 150;
      return updated.slice(-maxOrganisms);
    });

    frameRef.current = requestAnimationFrame(updateOrganisms);
  }, [calculateForces, containerSize]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(updateOrganisms);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updateOrganisms]);

  useEffect(() => {
    const initialCount = window.innerWidth < 768 ? 3 : 5;
    const initialOrganisms = Array(initialCount)
      .fill(null)
      .map(() => createOrganism(
        Math.random() * containerSize.width,
        Math.random() * containerSize.height
      ));
    setOrganisms(initialOrganisms);
  }, [createOrganism, containerSize]);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Theme Toggle Button */}
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

      {/* Background Evolution Layer */}
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden touch-none"
        style={{ zIndex: 0 }}
      >
        {organisms.map(org => (
          <div
            key={org.id}
            className="absolute transition-transform duration-75"
            style={{
              left: `${org.x}px`,
              top: `${org.y}px`,
              color: org.color,
              transform: `scale(${org.genome.size})`,
              opacity: Math.max(0, 1 - org.age / org.genome.lifespan),
              fontSize: window.innerWidth < 768 ? '1.25rem' : '1.5rem',
            }}
          >
            {org.symbol}
          </div>
        ))}
      </div>

      {/* Content Layer */}
      <div 
        className="relative z-10 min-h-screen w-full"
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
      >
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <h1 className={`text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'} tracking-tight`}>
            Kye Gomez
          </h1>

          <div className={`prose max-w-none ${isDarkMode ? 'prose-invert' : 'prose'}`}>
            <p className="text-lg sm:text-xl mb-6">
              Neural architect crafting tomorrow's intelligence. Tap anywhere to spawn new AI agents...
            </p>

            <div className={`p-4 sm:p-6 rounded-lg border mb-6 sm:mb-8 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-black/50 border-red-400/30' 
                : 'bg-white/50 border-red-600/30'
            }`}>
              <h2 className={`text-xl sm:text-2xl font-semibold mb-3 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                Background Evolution
              </h2>
              <p className="text-sm sm:text-base">Tap anywhere to spawn new agents!</p>
              <ul className="list-none space-y-1 mt-3 text-sm sm:text-base">
                <li>• Active Agents: {organisms.length}</li>
                <li>• Generation: {generation}</li>
                <li>• Mutations: Continuous</li>
              </ul>
            </div>

            <section className="mb-8 sm:mb-12">
              <h2 className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                About Me
              </h2>
              <p className="mb-3 text-sm sm:text-base">
                I've been programming since I was 12 years old, and today, I lead Agora, 
                an open-source AI research lab non-profit with over 8,200 researchers worldwide.
              </p>
              <p className="mb-3 text-sm sm:text-base">
                We've successfully trained thousands of models and continue to push the 
                boundaries of AI innovation.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className={`text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                Current Projects
              </h2>
              <p className="text-sm sm:text-base">
                I'm working on Swarms, a framework for orchestrating millions of agents 
                to automate recurring enterprise operations. If you're interested in AI 
                research or neural networks, check out my work on GitHub and YouTube, 
                where I share insights, projects, and tutorials.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
