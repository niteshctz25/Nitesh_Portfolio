import React from 'react';
import { Heart, Terminal } from 'lucide-react';

const Footer = ({ personalInfo }) => {
  return (
    <footer className="relative py-8 px-4 border-t border-[#00d4ff]/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-gray-400">
            <Terminal className="w-4 h-4 text-[#00d4ff]" />
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}>
              © 2025 {personalInfo.name}. All rights reserved.
            </p>
          </div>

          {/* Center: Made with love */}
          <div className="flex items-center gap-2 text-gray-400">
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
              Built with
            </p>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
              and React
            </p>
          </div>

          {/* Right: Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <p className="text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}>
              System Online
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
