'use client';

import React, { useState, useEffect, useRef } from 'react';

const WaterRipple = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drops, setDrops] = useState<Array<{x: number; y: number; radius: number; opacity: number}>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const updatedDrops = drops.map(drop => ({
        ...drop,
        radius: drop.radius + 2,
        opacity: drop.opacity - 0.02
      })).filter(drop => drop.opacity > 0);
      
      updatedDrops.forEach(drop => {
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(64, 164, 223, ${drop.opacity})`;
        ctx.stroke();
      });
      
      setDrops(updatedDrops);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [drops]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDrops(prev => [...prev, {
      x,
      y,
      radius: 0,
      opacity: 0.8
    }]);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      onClick={handleClick}
      className="w-full h-96 bg-blue-50 cursor-pointer rounded-lg mb-8"
    />
  );
};

const ASCIIArt = () => {
  const [frame, setFrame] = useState(0);
  const frames = [
    `
     /\\____/\\    
    /  o  o  \\   Neural
   ( ==  ^  == )  Networks
    )         (   & AI
   (           )  Research
    |___|___|  
    `,
    `
     /\\____/\\    
    /  -  -  \\   Neural
   ( ==  ^  == )  Networks
    )         (   & AI
   (           )  Research
    |___|___|  
    `
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prev => (prev + 1) % frames.length);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <pre className="font-mono text-sm whitespace-pre overflow-x-auto mb-8 text-blue-600">
      {frames[frame]}
    </pre>
  );
};

export default function HomePage() {
  return (
    <section className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-12">
        <ASCIIArt />
      </div>
      
      <h1 className="mb-8 text-4xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Kye Gomez&apos;s Home Page
      </h1>
      
      <div className="mb-8 text-lg">
        Click anywhere on the canvas below to create water ripples!
      </div>
      
      <WaterRipple />
      
      <p className="mb-8 text-lg leading-relaxed">
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
