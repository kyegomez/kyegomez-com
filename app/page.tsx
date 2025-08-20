'use client';

import React from 'react';

export default function HomePage() {
  return (
    <div className="flex justify-center items-start pt-2 sm:pt-4">
      <div className="terminal-window max-w-6xl">
        <div className="terminal-content">
          {/* Mission Statement Section */}
          <div className="mb-8">
            <h2 className="neon-text-red mb-6 text-2xl lg:text-3xl">MISSION STATEMENT</h2>
            <div className="cyber-card">
              <p className="text-gray-300 text-base leading-relaxed">
                My name is Kye Gomez, I'm 21 years old and my mission is to conquer the universe to expand Humanity. 
                Through cutting-edge AI research, nanotechnology breakthroughs, theoretical physics discoveries, and 
                multi-agent systems innovation, I'm building the foundation for humanity's next evolutionary leap. 
                From open source development to collaborative intelligence, from economic systems to open source collaboration, 
                every breakthrough brings us closer to unlocking the universe's infinite potential and securing 
                humanity's place among the stars.
              </p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h2 className="neon-text-red mb-6 text-2xl lg:text-3xl">EXPERIENCE</h2>
            <div className="space-y-6">
              <div className="cyber-card">
                <h3 className="neon-text-red text-xl lg:text-2xl mb-3">Founder & CEO</h3>
                <p className="text-gray-300 text-base mb-2">Agora Labs (agoralabs.ai)</p>
                <p className="text-gray-400 text-sm mb-3">2022 - 2025</p>
                <p className="text-gray-300 text-sm">
                  Leading AI research and development with a global team of researchers.
                </p>
              </div>

              <div className="cyber-card">
                <h3 className="neon-text-red text-xl lg:text-2xl mb-3">Founder & CEO</h3>
                <p className="text-gray-300 text-base mb-2">Swarms.ai</p>
                <p className="text-gray-400 text-sm mb-3">Multi-Agent AI Research Lab</p>
                <p className="text-gray-300 text-sm">
                  Pioneering multi-agent systems and swarm intelligence research.
                </p>
              </div>
            </div>
          </div>

          {/* Research Interests Section */}
          <div className="mb-8">
            <h2 className="neon-text-white mb-6 text-2xl lg:text-3xl">RESEARCH INTERESTS</h2>
            <div className="cyber-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-300 text-base">• Quantum Physics & Computing</p>
                  <p className="text-gray-300 text-base">• Economics & Market Dynamics</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300 text-base">• Artificial Intelligence & Machine Learning</p>
                  <p className="text-gray-300 text-base">• Open Source Development</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Interests Section */}
          <div className="mb-8">
            <h2 className="neon-text-red mb-6 text-2xl lg:text-3xl">PERSONAL INTERESTS</h2>
            <div className="cyber-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-300 text-base">• Basketball</p>
                  <p className="text-gray-300 text-base">• MMA (Mixed Martial Arts)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300 text-base">• Reading & Research</p>
                  <p className="text-gray-300 text-base">• Innovation & Technology</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h2 className="neon-text-white mb-6 text-2xl lg:text-3xl">ABOUT</h2>
            <div className="cyber-card mb-6">
              <h3 className="neon-text-red text-2xl lg:text-3xl mb-4">KYE GOMEZ</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                  <span className="neon-text-red text-sm">ROLE:</span>
                  <span className="text-gray-300 text-sm">AI Researcher & Entrepreneur</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                  <span className="neon-text-red text-sm">FOCUS:</span>
                  <span className="text-gray-300 text-sm">Multi-Agent Systems, Economics, Innovation</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                  <span className="neon-text-red text-sm">APPROACH:</span>
                  <span className="text-white text-sm">U/ACC, Open Source, Research-Driven</span>
                </div>
              </div>
            </div>

            <div className="cyber-card mb-6">
              <h3 className="neon-text-white mb-4 text-lg lg:text-xl">MISSION</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Advancing humanity through AI research, open source development, and 
                innovative thinking. Building the future of multi-agent systems and 
                pushing the boundaries of what's possible with artificial intelligence.
              </p>
            </div>

            <div className="cyber-card">
              <h3 className="neon-text-red mb-4 text-lg lg:text-xl">CONTACT</h3>
              <div className="space-y-2">
                <div className="text-gray-300 text-sm">
                  <span className="neon-text-red">Website:</span> agoralabs.ai
                </div>
                <div className="text-gray-300 text-sm">
                  <span className="neon-text-red">Research:</span> swarms.ai
                </div>
              </div>
            </div>
          </div>

          {/* Footer Terminal Info */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-400">
              <span>KYE_GOMEZ.exe - Simple Terminal Interface</span>
              <span>Build: v2.0.24 | Status: OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
