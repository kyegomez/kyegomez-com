'use client';

import React, { useState, useEffect } from 'react';

interface ASCIICreature {
  id: number;
  x: number;
  y: number;
  species: number;
  energy: number;
  dialogue: string;
  emoji: string;
}

const GRID_WIDTH = 40;
const GRID_HEIGHT = 15;
const INITIAL_POPULATION = 10;

const dialogues = [
  "Hi friend!",
  "Let's evolve!",
  "Neural nets!",
  "AI is fun!",
  "Swarms rock!",
  "Hello world!",
  "Let's code!",
  "Training...",
  "Optimizing...",
  "Learning..."
];

const emojis = ['ʕ•ᴥ•ʔ', '(•◡•)', '(っ◔◡◔)っ', 'ʕ￫ᴥ￩ʔ', '(^◡^)', '(・◇・)', 'ʕ•͡ᴥ•ʔ', '(◕‿◕)', '(｡♥‿♥｡)', 'ʕ•ᴥ•ʔ'];

export default function Page() {
  const [creatures, setCreatures] = useState<ASCIICreature[]>([]);
  const [generation, setGeneration] = useState(0);

  // Initialize population
  useEffect(() => {
    const initial = Array.from({ length: INITIAL_POPULATION }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT),
      species: Math.floor(Math.random() * emojis.length),
      energy: 100,
      dialogue: dialogues[Math.floor(Math.random() * dialogues.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));
    setCreatures(initial);
  }, []);

  // Update simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCreatures(prev => {
        // Move creatures and update their state
        const updated = prev.map(creature => {
          // Random movement
          const newX = (creature.x + Math.floor(Math.random() * 3) - 1 + GRID_WIDTH) % GRID_WIDTH;
          const newY = (creature.y + Math.floor(Math.random() * 3) - 1 + GRID_HEIGHT) % GRID_HEIGHT;
          
          // Decrease energy
          let newEnergy = creature.energy - 1;
          
          // Random chance to change dialogue
          const newDialogue = Math.random() < 0.1 ? 
            dialogues[Math.floor(Math.random() * dialogues.length)] : 
            creature.dialogue;

          return {
            ...creature,
            x: newX,
            y: newY,
            energy: newEnergy,
            dialogue: newDialogue
          };
        });

        // Reproduction
        const newCreatures = [...updated];
        updated.forEach(creature => {
          if (creature.energy > 80 && Math.random() < 0.1) {
            newCreatures.push({
              id: Math.random(),
              x: creature.x,
              y: creature.y,
              species: Math.random() < 0.9 ? creature.species : Math.floor(Math.random() * emojis.length),
              energy: 100,
              dialogue: dialogues[Math.floor(Math.random() * dialogues.length)],
              emoji: Math.random() < 0.9 ? creature.emoji : emojis[Math.floor(Math.random() * emojis.length)]
            });
          }
        });

        // Remove low energy creatures
        const survivors = newCreatures.filter(c => c.energy > 0);

        // Keep population in check
        const maxPop = 20;
        if (survivors.length > maxPop) {
          survivors.sort((a, b) => b.energy - a.energy);
          survivors.length = maxPop;
        }

        setGeneration(g => g + 1);
        return survivors;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Kye Gomez&apos;s Home Page
      </h1>

      <div className="mb-4 text-lg">
        Generation: {generation} | Population: {creatures.length}
      </div>

      <div className="font-mono bg-black text-white p-4 rounded-lg mb-8 overflow-hidden">
        {Array.from({ length: GRID_HEIGHT }).map((_, y) => (
          <div key={y} className="flex whitespace-pre">
            {Array.from({ length: GRID_WIDTH }).map((_, x) => {
              const creature = creatures.find(c => c.x === x && c.y === y);
              return (
                <span key={x} className="w-6 h-6 flex items-center justify-center">
                  {creature ? creature.emoji : ' '}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {creatures.map(creature => (
          <div key={creature.id} className="text-sm">
            {creature.emoji}: {creature.dialogue} (Energy: {creature.energy})
          </div>
        ))}
      </div>

      <p className="mt-8 mb-8 text-lg leading-relaxed">
        Hello, I&apos;m Kye Gomez, and I build neural networks. 
        I&apos;ve been programming since I was 12 years old, and today, I lead Agora, 
        an open-source AI research lab non-profit with over 8,200 researchers worldwide. 
        We&apos;ve successfully trained thousands of models and continue to push the 
        boundaries of AI innovation.
      </p>
      
      <p className="mb-8 text-lg leading-relaxed">
        I&apos;m also working on Swarms, a framework for orchestrating millions of 
        agents to automate recurring enterprise operations. If you&apos;re interested 
        in AI research or neural networks, check out my work on GitHub and YouTube, 
        where I share insights, projects, and tutorials.
      </p>
    </section>
  );
}
