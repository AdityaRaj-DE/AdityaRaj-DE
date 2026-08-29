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

        /* Twinkling stars animation */
        .star { animation: twinkle 4s infinite ease-in-out; fill: #ffffff; }
        .star:nth-child(even) { animation-duration: 3s; animation-delay: 1s; fill: #ffea00; }
        .star:nth-child(3n) { animation-duration: 5s; animation-delay: 2s; fill: #00ffcc; }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        /* Hover float effect on the main group */
        .card-content { animation: float 6s ease-in-out infinite; transform-origin: center; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      </style>

      <defs>
        <pattern id="scanline-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="2" fill="#000" />
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="800" height="220" class="bg" rx="0" ${border} />
      
      <!-- Stars (Pixel art squares) -->
      <g>
        <rect class="star" x="700" y="40" width="4" height="4" />
        <rect class="star" x="650" y="120" width="4" height="4" />
        <rect class="star" x="500" y="30" width="4" height="4" />
        <rect class="star" x="550" y="160" width="4" height="4" />
        <rect class="star" x="300" y="80" width="4" height="4" />
        <rect class="star" x="400" y="140" width="4" height="4" />
        <rect class="star" x="200" y="50" width="4" height="4" />
        <rect class="star" x="750" y="100" width="4" height="4" />
      </g>

      <g class="card-content">
        <text x="40" y="40" class="text-title">ACTIVE QUESTS (INTERESTS)</text>
        
        <!-- List Items -->
        ${itemsSvg}
      </g>
      
      <!-- Retro scanlines overlay -->
      <rect width="800" height="220" class="scanline" />
    </svg>
  `;
}
