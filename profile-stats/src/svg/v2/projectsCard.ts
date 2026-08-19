import { Project, CardOptions } from '../../types';
import { getTheme } from '../../themes';

export function renderProjectsCard(projects: Project[], options: CardOptions): string {
  const theme = getTheme(options.theme);
  const border = options.hideBorder ? '' : `stroke="${theme.borderColor}" stroke-width="4"`;

  let cardsSvg = '';
  let yOffset = 70;

  projects.forEach((repo, index) => {
    const delay = index * 200;

    // Simple text wrapper
    const words = repo.description.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + word).length > 60) {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    }
    if (currentLine.trim()) lines.push(currentLine.trim());
    const descLines = lines.slice(0, 2);
    if (lines.length > 2) descLines[1] = descLines[1].replace(/.{3}$/, '...');

    const descSvg = descLines
      .map((line, i) => `<tspan x="20" dy="${i === 0 ? 0 : 20}">${line}</tspan>`)
      .join('');

    cardsSvg += `
      <g transform="translate(40, ${yOffset})">
        <g class="card-stagger" style="animation-delay: ${delay}ms;">
          <!-- Inner Card Border -->
          <rect x="0" y="0" width="720" height="105" fill="#111" class="pixel-border" />
          
          <!-- Repo Name -->
          <text class="text-repo" x="20" y="30">${repo.name}</text>
          
          <!-- Repo Description -->
          <text class="text-desc" x="20" y="55">${descSvg}</text>
          
          <!-- Language indicator -->
          <circle cx="25" cy="90" r="4" fill="${repo.languageColor}" />
          <text class="text-lang" x="35" y="94">${repo.language}</text>
        </g>
      </g>
    `;
    yOffset += 125;
  });

  const svgHeight = yOffset + 20;

  return `
    <svg width="800" height="${svgHeight}" viewBox="0 0 800 ${svgHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&amp;display=swap');
        
        .bg { fill: #0d0d14; }
        .pixel-border { stroke-linecap: square; stroke-linejoin: miter; stroke: #333; stroke-width: 2; }
        
        .text-title { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 16px; fill: #00ffcc; text-shadow: 2px 2px #ff00ff; }
        
        .text-repo { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 14px; fill: #ffea00; }
        .text-desc { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 10px; fill: #e0e0e0; }
        .text-lang { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 10px; fill: #888; }
        
        .card-stagger {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
          transform: translateX(-20px);
        }
        
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
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
      
      <text x="40" y="35" class="text-title">SELECT LEVEL (FEATURED PROJECTS)</text>
      
      ${cardsSvg}
      
      <!-- Retro scanlines overlay -->
      <rect width="800" height="${svgHeight}" class="scanline" />
    </svg>
  `;
}
