'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Gene {
  speed: number;
  adaptability: number;
  intelligence: number;
  power: number;
}

interface Agent {
  id: number;
  genes: Gene;
  fitness: number;
  x: number;
  y: number;
  generation: number;
  symbol: string;
  size: number;
}

const INITIAL_POPULATION = 15;
const MUTATION_RATE = 0.15;
const SURVIVAL_THRESHOLD = 0.6;

const EvolutionGame = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [generation, setGeneration] = useState(0);
  const [highestFitness, setHighestFitness] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [survivedGenerations, setSurvivedGenerations] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const symbols = ['◈', '◇', '◆', '⬡', '⬢', '△', '▲', '○', '●'];
  const icons = {
    brain: '🧠',
    zap: '⚡',
    alert: '⚠️',
    crown: '👑'
  };

  const initializeAgent = (id: number): Agent => ({
    id,
    genes: {
      speed: Math.random(),
      adaptability: Math.random(),
      intelligence: Math.random(),
      power: Math.random(),
    },
    fitness: 0,
    x: Math.random() * 100,
    y: Math.random() * 100,
    generation: 0,
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    size: 1
  });

  useEffect(() => {
    setAgents(Array.from({ length: INITIAL_POPULATION }, (_, i) => initializeAgent(i)));
  }, []);

  const calculateFitness = useCallback((agent: Agent) => {
    const { speed, adaptability, intelligence, power } = agent.genes;
    const environmentalPressure = Math.sin(Date.now() / 1000) * 0.2 + 0.8;
    return (speed * 0.25 + adaptability * 0.3 + intelligence * 0.25 + power * 0.2) * environmentalPressure;
  }, []);

  const evolve = useCallback(() => {
    setAgents(prev => {
      const withFitness = prev.map(agent => ({
        ...agent,
        fitness: calculateFitness(agent)
      }));

      const sorted = [...withFitness].sort((a, b) => b.fitness - a.fitness);
      setHighestFitness(sorted[0].fitness);

      const averageFitness = withFitness.reduce((sum, agent) => sum + agent.fitness, 0) / withFitness.length;
      
      if (averageFitness < SURVIVAL_THRESHOLD) {
        setIsGameOver(true);
        return prev;
      }

      setSurvivedGenerations(g => g + 1);

      const survivors = sorted.slice(0, Math.ceil(sorted.length * 0.5));
      const newGeneration = survivors.flatMap(parent => {
        const partner = survivors[Math.floor(Math.random() * survivors.length)];
        const child = {
          ...initializeAgent(Math.random()),
          generation: parent.generation + 1,
          symbol: Math.random() < 0.9 ? parent.symbol : symbols[Math.floor(Math.random() * symbols.length)],
          genes: {
            speed: Math.random() < MUTATION_RATE ? Math.random() : (parent.genes.speed + partner.genes.speed) / 2,
            adaptability: Math.random() < MUTATION_RATE ? Math.random() : (parent.genes.adaptability + partner.genes.adaptability) / 2,
            intelligence: Math.random() < MUTATION_RATE ? Math.random() : (parent.genes.intelligence + partner.genes.intelligence) / 2,
            power: Math.random() < MUTATION_RATE ? Math.random() : (parent.genes.power + partner.genes.power) / 2,
          }
        };
        return [child];
      });

      setGeneration(g => g + 1);
      return newGeneration;
    });
  }, [calculateFitness]);

  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(evolve, 1000 / gameSpeed);
    return () => clearInterval(timer);
  }, [evolve, gameSpeed, isGameOver]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 text-red-500 tracking-tight">
          Neural Evolution
        </h1>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-red-500/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{icons.brain}</span>
              <h2 className="text-2xl font-semibold text-red-500">Stats</h2>
            </div>
            <div className="space-y-2">
              <p>Generation: {generation}</p>
              <p>Survived Generations: {survivedGenerations}</p>
              <p>Population: {agents.length}</p>
              <p>Highest Fitness: {highestFitness.toFixed(3)}</p>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-red-500/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{icons.zap}</span>
              <h2 className="text-2xl font-semibold text-red-500">Controls</h2>
            </div>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={gameSpeed}
              onChange={(e) => setGameSpeed(parseFloat(e.target.value))}
              className="w-full accent-red-500"
            />
            <p>Speed: {gameSpeed}x</p>
          </div>
        </div>

        {isGameOver && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg border border-red-500 text-center">
              <div className="text-4xl mb-4">{icons.alert}</div>
              <h2 className="text-3xl font-bold text-red-500 mb-4">Evolution Failed</h2>
              <p className="mb-4">Your AI species survived for {survivedGenerations} generations</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <div className="relative h-[60vh] bg-gray-900 rounded-lg border border-red-500/30 overflow-hidden">
          {agents.map(agent => (
            <div
              key={agent.id}
              className="absolute transition-all duration-500"
              style={{
                left: `${agent.x}%`,
                top: `${agent.y}%`,
                transform: `translate(-50%, -50%) scale(${1 + agent.fitness})`,
                color: `hsl(${agent.fitness * 360}, 100%, 50%)`
              }}
            >
              <div className="text-2xl">{agent.symbol}</div>
              {agent.fitness === highestFitness && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-500 text-sm">
                  {icons.crown}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-gray-400">
            Hello, I'm Kye Gomez. Like these evolving agents, I've been on a journey of continuous growth in AI and neural networks since age 12. Today, I lead Agora, connecting over 8,200 researchers worldwide in pushing the boundaries of artificial intelligence.
          </p>
          <p className="text-gray-400">
            Through Swarms, I'm working on orchestrating millions of agents to solve complex problems. Watch these digital organisms evolve and adapt - it's a small demonstration of the principles that drive my work in AI research and development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvolutionGame;
