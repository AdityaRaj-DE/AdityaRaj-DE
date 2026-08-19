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
      </style>

      <defs>
        <pattern id="scanline-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="2" fill="#000" />
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="800" height="270" class="bg" rx="0" ${border} />
      
      <text x="40" y="45" class="text-title">NPC DIALOG: [ ABOUT_ME ]</text>
      
      <!-- Content Box -->
      <g transform="translate(20, 70)" class="typewriter">
        <rect x="0" y="0" width="760" height="180" fill="#111" class="pixel-border" />
        <text class="text-desc" x="20" y="30">${descSvg}</text>
      </g>
      
      <!-- Retro scanlines overlay -->
      <rect width="800" height="270" class="scanline" />
    </svg>
  `;
}
