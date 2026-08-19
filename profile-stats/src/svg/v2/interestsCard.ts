import { CardOptions } from '../../types';
import { getTheme } from '../../themes';
import { pressStart2PFont } from '../../utils/fonts';

export function renderInterestsCard(options: CardOptions): string {
  const theme = getTheme(options.theme);
  const border = options.hideBorder ? '' : `stroke="${theme.borderColor}" stroke-width="4"`;

  const interests = ['Backend Engineering', 'Cloud Computing', 'System Design', 'Data Processing'];

  const itemsSvg = interests
    .map((item, i) => {
      const yPos = 80 + i * 30;
      return `
        <g class="fade-in" style="animation-delay: ${i * 200}ms">
          <circle cx="50" cy="${yPos - 4}" r="5" fill="#ff00ff" />
          <text x="70" y="${yPos}" class="text-item">${item}</text>
        </g>
      `;
    })
    .join('');

  return `
    <svg width="800" height="220" viewBox="0 0 800 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${pressStart2PFont}
        
        .bg { fill: #0d0d14; }
        .pixel-border { stroke-linecap: square; stroke-linejoin: miter; stroke: #333; stroke-width: 2; }
        
        .text-title { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 16px; fill: #00ffcc; text-shadow: 2px 2px #ff00ff; }
        .text-item { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 14px; fill: #ffea00; }
        
        .scanline {
          fill: url(#scanline-pattern);
          opacity: 0.15;
          pointer-events: none;
        }
        
        .fade-in {
          animation: slideRight 0.5s ease-out forwards;
          opacity: 0;
          transform: translateX(-10px);
        }
        
        @keyframes slideRight {
          to { opacity: 1; transform: translateX(0); }
        }
      </style>

      <defs>
        <pattern id="scanline-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="2" fill="#000" />
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="800" height="220" class="bg" rx="0" ${border} />
      
      <text x="40" y="40" class="text-title">ACTIVE QUESTS (INTERESTS)</text>
      
      <!-- List Items -->
      ${itemsSvg}
      
      <!-- Retro scanlines overlay -->
      <rect width="800" height="220" class="scanline" />
    </svg>
  `;
}
