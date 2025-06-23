'use client';

import React, { useState, useEffect } from 'react';

interface TerminalCommand {
  command: string;
  output: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface SystemModule {
  name: string;
  description: string;
  status: 'online' | 'offline' | 'maintenance';
  icon: string;
}

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [terminalHistory, setTerminalHistory] = useState<TerminalCommand[]>([
    {
      command: 'system.boot',
      output: 'KYE_GOMEZ.exe v2.0.24 - Swarms Terminal Interface',
      type: 'success'
    },
    {
      command: 'system.status',
      output: 'All systems operational. Neural networks online.',
      type: 'success'
    },
    {
      command: 'user.authenticate',
      output: 'Welcome, authorized user. Access granted to all sectors.',
      type: 'success'
    }
  ]);

  const systemModules: SystemModule[] = [
    {
      name: "ARTIFICIAL_INTELLIGENCE",
      description: "Building cutting-edge AI systems and pushing the boundaries of machine learning",
      status: 'online',
      icon: "🤖"
    },
    {
      name: "FAITH_SPIRITUALITY",
      description: "Deepening relationship with YHWH through daily prayer and meditation",
      status: 'online',
      icon: "🙏"
    },
    {
      name: "ECONOMICS_ENGINE",
      description: "Studying market dynamics and their impact on technology and society",
      status: 'online',
      icon: "📊"
    },
    {
      name: "RESEARCH_DATABASE",
      description: "Reading and analyzing academic papers in AI, economics, and technology",
      status: 'online',
      icon: "📚"
    },
    {
      name: "INNOVATION_LAB",
      description: "Leading Agora Labs and developing new frameworks for AI development",
      status: 'online',
      icon: "💡"
    },
    {
      name: "OPEN_SOURCE_NETWORK",
      description: "Contributing to and maintaining open source projects in the AI community",
      status: 'online',
      icon: "🌐"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addTerminalCommand = (command: string, output: string, type: TerminalCommand['type'] = 'info') => {
    setTerminalHistory(prev => [...prev, { command, output, type }]);
  };

  return (
    <div className="flex justify-center items-start pt-2 sm:pt-4">
      {/* Terminal Window */}
      <div className="terminal-window max-w-6xl">
        <div className="terminal-header">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <span className="text-xs sm:text-sm">KYE_GOMEZ.exe - TERMINAL v2.0.24</span>
            <span className="neon-text-red text-xs sm:text-sm">
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
        </div>
        
        <div className="terminal-content">
          {/* Terminal History */}
          <div className="mb-6 sm:mb-8">
            {terminalHistory.map((cmd, index) => (
              <div key={index} className="terminal-command">
                <div className="text-red-500 font-bold text-xs sm:text-sm">root@kyegomez:~$ {cmd.command}</div>
                <div className={`mt-2 text-xs sm:text-sm ${
                  cmd.type === 'success' ? 'text-red-400' :
                  cmd.type === 'error' ? 'text-red-400' :
                  cmd.type === 'warning' ? 'text-white' :
                  'text-gray-300'
                }`}>
                  {cmd.output}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - System Status */}
            <div>
              <h2 className="neon-text-red mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl">SYSTEM STATUS</h2>
              
              <div className="space-y-3 sm:space-y-4">
                {systemModules.map((module, index) => (
                  <div key={index} className="cyber-card">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-xl sm:text-2xl">{module.icon}</span>
                        <h3 className="neon-text-red text-sm sm:text-base lg:text-lg">{module.name}</h3>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-bold ${
                        module.status === 'online' ? 'bg-red-900 text-red-400' :
                        module.status === 'offline' ? 'bg-gray-900 text-gray-400' :
                        'bg-yellow-900 text-yellow-400'
                      }`}>
                        {module.status.toUpperCase()}
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm mt-2 sm:mt-3">{module.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - User Info */}
            <div>
              <h2 className="neon-text-white mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl">USER PROFILE</h2>
              
              <div className="cyber-card mb-4 sm:mb-6">
                <h3 className="neon-text-red text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4">KYE GOMEZ</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                    <span className="neon-text-red text-xs sm:text-sm">ID:</span>
                    <span className="text-gray-300 text-xs sm:text-sm">AGORA_LABS_LEADER</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                    <span className="neon-text-red text-xs sm:text-sm">STATUS:</span>
                    <span className="text-red-400 text-xs sm:text-sm">ACTIVE</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                    <span className="neon-text-red text-xs sm:text-sm">CLEARANCE:</span>
                    <span className="text-white text-xs sm:text-sm">MAXIMUM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                    <span className="neon-text-red text-xs sm:text-sm">SPECIALIZATION:</span>
                    <span className="text-gray-300 text-xs sm:text-sm">AI/ML, ECONOMICS, FAITH</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                    <span className="neon-text-red text-xs sm:text-sm">PROFESSIONS:</span>
                    <span className="text-gray-300 text-xs sm:text-sm">Leader of swarms.ai, Leader of agoralab.ai</span>
                  </div>
                </div>
              </div>

              <div className="cyber-card">
                <h3 className="neon-text-white mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">MISSION STATEMENT</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  Advancing Humanity through AI, U/acc, economics, and faith in YHWH, 
                  King of The Universe. Leading Agora Labs with over 8,200 researchers 
                  worldwide to push the boundaries of artificial intelligence and 
                  technological innovation.
                </p>
              </div>

              <div className="cyber-card mt-4 sm:mt-6">
                <h3 className="neon-text-red mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">QUICK COMMANDS</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => addTerminalCommand('blog.open', 'Opening blog interface...', 'success')}
                    className="w-full text-left p-2 bg-black/50 border border-red-500 rounded hover:bg-red-500/20 transition-colors text-xs sm:text-sm"
                  >
                    blog.open
                  </button>
                  <button 
                    onClick={() => addTerminalCommand('system.diagnostics', 'Running system diagnostics...', 'info')}
                    className="w-full text-left p-2 bg-black/50 border border-white rounded hover:bg-white/20 transition-colors text-xs sm:text-sm"
                  >
                    system.diagnostics
                  </button>
                  <button 
                    onClick={() => addTerminalCommand('network.scan', 'Scanning network for threats...', 'warning')}
                    className="w-full text-left p-2 bg-black/50 border border-red-400 rounded hover:bg-red-400/20 transition-colors text-xs sm:text-sm"
                  >
                    network.scan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Terminal Info */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-400">
              <span>KYE_GOMEZ.exe - Swarms Terminal Interface</span>
              <span>Build: v2.0.24 | Status: OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
