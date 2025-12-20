import React from 'react';

/**
 * Decorative animated wave divider.
 * @returns SVG wave element
 */
const WaveDivider: React.FC = () => {
  return (
    <div data-testid="wave-divider" aria-hidden className="w-full overflow-hidden">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
        <path d="M0,20 C240,60 480,-20 720,20 C960,60 1200,-20 1440,20 L1440,120 L0,120 Z" fill="currentColor" className="text-sky-500" />
      </svg>
    </div>
  );
};

export default React.memo(WaveDivider);



