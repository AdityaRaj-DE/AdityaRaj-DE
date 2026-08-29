import { Project, CardOptions } from '../../types';
import { getTheme } from '../../themes';
import { pressStart2PFont } from '../../utils/fonts';

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
        ${pressStart2PFont}
        
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
        
        .scanline {
          fill: url(#scanline-pattern);
          opacity: 0.15;
          pointer-events: none;
        }

        ${options.theme === 'light' ? `
        .bg { fill: #ffffff; }
        .pixel-border { stroke: #cccccc; fill: #f9f9f9; }
        .text-title { fill: #0055cc; text-shadow: 2px 2px #dddddd; }
        .text-repo { fill: #aa7700; }
        .text-desc { fill: #333333; }
        .text-lang { fill: #555555; }
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
      <rect width="800" height="${svgHeight}" class="bg" rx="0" ${border} />
      
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
        <text x="40" y="35" class="text-title">SELECT LEVEL (FEATURED PROJECTS)</text>
        
        ${cardsSvg}
      </g>
      
      <!-- Retro scanlines overlay -->
      <rect width="800" height="${svgHeight}" class="scanline" />
    </svg>
  `;
}
