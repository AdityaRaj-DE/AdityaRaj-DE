import { TopLanguages, CardOptions } from '../../types';
import { getTheme } from '../../themes';

export function renderTechStackCard(data: TopLanguages, options: CardOptions): string {
  const theme = getTheme(options.theme);
  const border = options.hideBorder ? '' : `stroke="${theme.borderColor}" stroke-width="4"`;

  // Calculate total size for percentage calculation
  const total = data.totalSize;

  let barsSvg = '';
  let yOffset = 65;

  data.languages.forEach((lang, index) => {
    const percent = total > 0 ? (lang.size / total) * 100 : 0;
    const barWidth = total > 0 ? (lang.size / total) * 450 : 0;
    const delay = index * 150;

    barsSvg += `
      <g transform="translate(40, ${yOffset})">
        <text class="text-lang" x="0" y="15">${lang.name}</text>
        <rect x="180" y="2" width="450" height="16" fill="#111" class="pixel-border"/>
        
        <g class="grow" style="animation-delay: ${delay}ms;">
          <rect x="180" y="2" width="${barWidth}" height="16" fill="${lang.color}" />
          <!-- Shine effect on the bar -->
          <rect x="180" y="2" width="${barWidth}" height="4" fill="#ffffff" opacity="0.3" />
        </g>
        
        <text class="text-percent" x="650" y="15">${percent.toFixed(1)}%</text>
      </g>
    `;
    yOffset += 40;
  });

  // Dynamically size the SVG based on the number of languages returned
  const svgHeight = data.languages.length > 0 ? yOffset + 20 : 150;

  return `
    <svg width="800" height="${svgHeight}" viewBox="0 0 800 ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&amp;display=swap');
        
        .bg { fill: #0d0d14; }
        .pixel-border { stroke-linecap: square; stroke-linejoin: miter; stroke: #333; stroke-width: 2; }
        .text-title { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 16px; fill: #00ffcc; text-shadow: 2px 2px #ff00ff; }
        .text-lang { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 12px; fill: #e0e0e0; }
        .text-percent { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 10px; fill: #ffea00; }
        
        .grow { 
          animation: growBar 1s ease-out forwards; 
          transform-origin: 180px 50%;
          transform: scaleX(0);
        }
        @keyframes growBar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        
        .scanline {
          fill: url(#scanline-pattern);
          opacity: 0.15;
          pointer-events: none;
        }
      </style>

      <defs>
        <pattern id="scanline-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="2" fill="#000" />
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="800" height="${svgHeight}" class="bg" rx="0" ${border} />
      
      <text x="40" y="35" class="text-title">CURRENT TECH STACK</text>
      
      ${barsSvg}
      
      <!-- Retro scanlines overlay -->
      <rect width="800" height="${svgHeight}" class="scanline" />
    </svg>
  `;
}
