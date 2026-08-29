import { CardOptions } from '../../types';
import { getTheme } from '../../themes';
import { pressStart2PFont } from '../../utils/fonts';

export function renderAboutCard(options: CardOptions): string {
  const theme = getTheme(options.theme);
  const border = options.hideBorder ? '' : `stroke="${theme.borderColor}" stroke-width="4"`;

  // The about text re-wrapped to be wider (approx 60-65 chars per line)
  const lines = [
    "I work professionally as a software developer handling full-stack",
    "applications, database architecture, and Google Cloud Platform",
    "deployments. Because my professional work is proprietary, this",
    "GitHub serves as a public portfolio of my personal projects.",
    "The repositories below demonstrate my approach to system",
    "design, containerization, and data handling."
  ];

  const descSvg = lines
    .map((line, i) => `<tspan x="20" dy="${i === 0 ? 0 : 25}">${line}</tspan>`)
    .join('');

  return `
    <svg width="800" height="270" viewBox="0 0 800 270" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${pressStart2PFont}
        
        .bg { fill: #0d0d14; }
        .pixel-border { stroke-linecap: square; stroke-linejoin: miter; stroke: #333; stroke-width: 2; }
        
        .text-title { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 16px; fill: #00ffcc; text-shadow: 2px 2px #ff00ff; }
        .text-desc { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 12px; fill: #e0e0e0; line-height: 1.5; }
        
        .scanline {
          fill: url(#scanline-pattern);
          opacity: 0.15;
          pointer-events: none;
        }
        
        .typewriter {
          animation: typing 1s steps(40, end);
        }
        
        @keyframes typing {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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
        
        ${options.theme === 'light' ? `
        .bg { fill: #ffffff; }
        .pixel-border { stroke: #cccccc; fill: #f9f9f9; }
        .text-title { fill: #0055cc; text-shadow: 2px 2px #dddddd; }
        .text-desc { fill: #333333; }
        .star { fill: #e0e0e0; }
        .star:nth-child(even) { fill: #d4af37; }
        .star:nth-child(3n) { fill: #0088aa; }
        ` : ''}
      </style>

      <defs>
        <pattern id="scanline-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="2" fill="#000" />
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="800" height="270" class="bg" rx="0" ${border} />
      
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
        <text x="40" y="45" class="text-title">NPC DIALOG: [ ABOUT_ME ]</text>
        
        <!-- Content Box -->
        <g transform="translate(20, 70)" class="typewriter">
          <rect x="0" y="0" width="760" height="180" fill="#111" class="pixel-border" />
          <text class="text-desc" x="20" y="30">${descSvg}</text>
        </g>
      </g>
      
      <!-- Retro scanlines overlay -->
      <rect width="800" height="270" class="scanline" />
    </svg>
  `;
}
