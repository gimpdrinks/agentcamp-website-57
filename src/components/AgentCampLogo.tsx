
import React from 'react';
import { Gamepad } from 'lucide-react';

const AgentCampLogo = ({ size = 40 }: { size?: number }) => {
  return (
    <div
      className="
        flex items-center gap-2 select-none 
        bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 
        px-3 py-1 rounded-lg shadow-lg
        animate-subtle-pulse
      "
      style={{
        fontFamily: `'Press Start 2P', 'Inter', ui-sans-serif, system-ui`,
        textShadow: `
          0 2px 4px rgba(0,0,0,0.4),
          0 0px 24px #FFBF00
        `,
      }}
    >
      <Gamepad color="#fff" size={size} className="drop-shadow-glow" />
      <span
        className="
          font-extrabold uppercase text-white text-lg md:text-2xl tracking-wide
          flex items-center"
        style={{
          letterSpacing: '0.1em',
        }}
      >
        Agent
        <span className="text-yellow-400" style={{ marginLeft: 2 }}>
          Camp
        </span>
      </span>
    </div>
  );
};

export default AgentCampLogo;
