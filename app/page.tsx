'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Organism {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
  size: number;
  velocity: { x: number; y: number };
  lifetime: number;
}

export default function HomePage() {
  const [organisms, setOrganisms] = useState<Organism[]>([]);
  const [generation, setGeneration] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const symbols = '◈◇◆⬡⬢△▲○●⎔⬣⬤⬦⬥∆∇□■'.split('');
  const colors = ['#FF3333', '#FF0066', '#FF33CC', '#CC33FF', '#3333FF'];

  const createOrganism = useCallback((x: number, y: number): Organism => ({
    id: Math.random(),
    x,
    y,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 1.5 + 0.5,
    velocity: {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    },
    lifetime: 0
  }), []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setOrganisms(prev => [
      ...prev,
      ...Array(3).fill(null).map(() => createOrganism(x, y))
    ]);
    setGeneration(g => g + 1);
  }, [createOrganism]);

  const updateOrganisms = useCallback(() => {
    setOrganisms(prev => {
      // Update existing organisms
      const updated = prev
        .map(org => ({
          ...org,
          x: org.x + org.velocity.x,
          y: org.y + org.velocity.y,
          lifetime: org.lifetime + 1,
          velocity: {
            x: org.velocity.x * 0.99,
            y: org.velocity.y * 0.99
          }
        }))
        .filter(org => org.lifetime < 200); // Remove old organisms

      // Create array for new organisms
      const newOrganisms: Organism[] = [];

      // Reproduce based on proximity
      updated.forEach(org => {
        if (Math.random() < 0.01) {
          newOrganisms.push(createOrganism(org.x, org.y));
        }
      });

      // Keep population in check
      const maxOrganisms = 100;
      const combined = [...updated, ...newOrganisms];
      return combined.slice(-maxOrganisms);
    });

    frameRef.current = requestAnimationFrame(updateOrganisms);
  }, [createOrganism]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(updateOrganisms);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updateOrganisms]);

  useEffect(() => {
    // Initialize with a few organisms
    const initialOrganisms = Array(5)
      .fill(null)
      .map(() => createOrganism(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      ));
    setOrganisms(initialOrganisms);
  }, [createOrganism]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background Evolution Layer */}
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {organisms.map(org => (
          <div
            key={org.id}
            className="absolute transition-transform duration-100"
            style={{
              left: `${org.x}px`,
              top: `${org.y}px`,
              color: org.color,
              transform: `scale(${org.size})`,
              opacity: Math.max(0, 1 - org.lifetime / 200),
              fontSize: '1.5rem',
            }}
          >
            {org.symbol}
          </div>
        ))}
      </div>

      {/* Content Layer - now spans full width for click detection */}
      <div 
        className="relative z-10 min-h-screen w-full"
        onClick={handleClick}
      >
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-6xl font-bold mb-8 text-red-500 tracking-tight">
            Kye Gomez
          </h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-xl mb-6">
              Neural architect crafting tomorrow's intelligence. Click anywhere to spawn new AI agents...
            </p>

            <div className="bg-gray-900/50 p-6 rounded-lg border border-red-500/30 mb-8">
              <h2 className="text-2xl font-semibold text-red-500 mb-4">Background Evolution</h2>
              <p>Each symbol represents an AI agent evolving in real-time. Click anywhere to spawn new agents!</p>
              <ul className="list-none space-y-2 mt-4">
                <li>• Active Agents: {organisms.length}</li>
                <li>• Generation: {generation}</li>
                <li>• Mutations: Continuous</li>
              </ul>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-red-500 mb-4">About Me</h2>
              <p className="mb-4">
                I've been programming since I was 12 years old, and today, I lead Agora, 
                an open-source AI research lab non-profit with over 8,200 researchers worldwide.
              </p>
              <p className="mb-4">
                We've successfully trained thousands of models and continue to push the 
                boundaries of AI innovation.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-red-500 mb-4">Current Projects</h2>
              <p>
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
