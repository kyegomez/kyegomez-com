'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Gene {
  movement: number;
  intelligence: number;
  cooperation: number;
  resilience: number;
}

interface Organism {
  id: number;
  genes: Gene;
  fitness: number;
  x: number;
  y: number;
  emoji: string;
  generation: number;
}

const POPULATION_SIZE = 30;
const MUTATION_RATE = 0.1;
const GRID_SIZE = { width: 60, height: 20 };

// Puzzle pieces that reveal your introduction
const puzzlePieces = [
  "Neural architect crafting tomorrow's intelligence",
  "Founded Agora, uniting 8,200+ AI researchers globally",
  "Built first neural network at age 12",
  "Leading Swarms: orchestrating million-agent systems",
  "Open-source advocate and AI accessibility champion"
];

const BackgroundEvolution = () => {
  const [organisms, setOrganisms] = useState<Organism[]>([]);
  const [generation, setGeneration] = useState(0);

  // Fitness function based on multiple traits
  const calculateFitness = useCallback((genes: Gene, positions: {x: number, y: number}[]) => {
    const positionDensity = positions.filter(p => 
      Math.abs(p.x) < 5 && Math.abs(p.y) < 5
    ).length;

    return (
      genes.intelligence * 0.3 +
      genes.cooperation * 0.2 +
      genes.resilience * 0.25 +
      genes.movement * 0.15 -
      (positionDensity * 0.1) // Penalize overcrowding
    );
  }, []);

  // Initialize population
  useEffect(() => {
    const initialPopulation = Array.from({ length: POPULATION_SIZE }, (_, id) => ({
      id,
      genes: {
        movement: Math.random(),
        intelligence: Math.random(),
        cooperation: Math.random(),
        resilience: Math.random()
      },
      fitness: 0,
      x: Math.floor(Math.random() * GRID_SIZE.width),
      y: Math.floor(Math.random() * GRID_SIZE.height),
      emoji: ['🧬', '🤖', '🔮', '💡', '⚛️'][Math.floor(Math.random() * 5)],
      generation: 0
    }));
    setOrganisms(initialPopulation);
  }, []);

  // Evolution step
  const evolve = useCallback(() => {
    setOrganisms(prev => {
      // Calculate fitness for current population
      const positions = prev.map(o => ({ x: o.x, y: o.y }));
      const withFitness = prev.map(org => ({
        ...org,
        fitness: calculateFitness(org.genes, positions)
      }));

      // Selection (tournament selection)
      const select = () => {
        const tournament = Array.from({ length: 3 }, () => 
          withFitness[Math.floor(Math.random() * withFitness.length)]
        );
        return tournament.reduce((a, b) => a.fitness > b.fitness ? a : b);
      };

      // Create new population
      const newPopulation = Array.from({ length: POPULATION_SIZE }, () => {
        const parent1 = select();
        const parent2 = select();

        // Crossover
        const childGenes = {
          movement: Math.random() < 0.5 ? parent1.genes.movement : parent2.genes.movement,
          intelligence: Math.random() < 0.5 ? parent1.genes.intelligence : parent2.genes.intelligence,
          cooperation: Math.random() < 0.5 ? parent1.genes.cooperation : parent2.genes.cooperation,
          resilience: Math.random() < 0.5 ? parent1.genes.resilience : parent2.genes.resilience
        };

        // Mutation
        if (Math.random() < MUTATION_RATE) {
          const geneToMutate = Object.keys(childGenes)[Math.floor(Math.random() * 4)] as keyof Gene;
          childGenes[geneToMutate] = Math.random();
        }

        return {
          id: Math.random(),
          genes: childGenes,
          fitness: 0,
          x: Math.floor(Math.random() * GRID_SIZE.width),
          y: Math.floor(Math.random() * GRID_SIZE.height),
          emoji: parent1.emoji,
          generation: parent1.generation + 1
        };
      });

      return newPopulation;
    });
    setGeneration(g => g + 1);
  }, [calculateFitness]);

  useEffect(() => {
    const timer = setInterval(evolve, 100);
    return () => clearInterval(timer);
  }, [evolve]);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-20 font-mono overflow-hidden">
      {organisms.map(org => (
        <div
          key={org.id}
          className="absolute transition-all duration-1000"
          style={{
            left: `${(org.x / GRID_SIZE.width) * 100}%`,
            top: `${(org.y / GRID_SIZE.height) * 100}%`,
            transform: `translate(-50%, -50%) scale(${org.fitness + 0.5})`
          }}
        >
          {org.emoji}
        </div>
      ))}
    </div>
  );
};

const PuzzleIntro = () => {
  const [solvedPieces, setSolvedPieces] = useState<Set<number>>(new Set());
  const [currentChallenge, setCurrentChallenge] = useState<string>('');

  useEffect(() => {
    const challenges = [
      "What drives a 12-year-old to start coding? (click when you know)",
      "How many researchers are part of Agora? (click when you know)",
      "What framework orchestrates millions of agents? (click when you know)",
      "What's the key to accessible AI? (click when you know)",
      "Neural networks are built for...? (click when you know)"
    ];
    setCurrentChallenge(challenges[solvedPieces.size]);
  }, [solvedPieces]);

  const handlePuzzleClick = () => {
    if (solvedPieces.size < puzzlePieces.length) {
      setSolvedPieces(prev => new Set([...prev, prev.size]));
    }
  };

  return (
    <div className="relative z-10">
      <h1 className="mb-8 text-4xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Decode My Story
      </h1>
      
      <div className="space-y-4">
        {Array.from({ length: puzzlePieces.length }).map((_, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg transition-all duration-500 ${
              solvedPieces.has(index) 
                ? 'bg-blue-100 cursor-default'
                : 'bg-gray-100 cursor-pointer hover:bg-gray-200'
            }`}
            onClick={solvedPieces.has(index) ? undefined : handlePuzzleClick}
          >
            {solvedPieces.has(index) ? puzzlePieces[index] : currentChallenge}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <section className="max-w-4xl mx-auto p-4">
      <BackgroundEvolution />
      <PuzzleIntro />
    </section>
  );
}
