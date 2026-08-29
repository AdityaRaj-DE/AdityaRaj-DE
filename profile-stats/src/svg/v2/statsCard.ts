import { GitHubStats, CardOptions } from '../../types';
import { getTheme } from '../../themes';
import { pressStart2PFont } from '../../utils/fonts';

export function renderStatsCard(stats: GitHubStats, options: CardOptions): string {
  const theme = getTheme(options.theme);
  const border = options.hideBorder ? '' : `stroke="${theme.borderColor}" stroke-width="4"`;

  const statItems = [
    { label: 'Total Stars', value: stats.totalStars, color: '#ffea00' },
    { label: 'Total Commits', value: stats.totalCommits, color: '#00ffcc' },
    { label: 'Repositories', value: stats.totalRepositories, color: '#ff00ff' },
    { label: 'Followers', value: stats.totalFollowers, color: '#3178c6' }
  ];

  const statsSvg = statItems
    .map((item, i) => {
      // Calculate layout for 2x2 grid
      const col = i % 2;
      const row = Math.floor(i / 2);
      const xOffset = 60 + col * 380;
      const yOffset = 100 + row * 60;

      return `
        <g class="fade-in" style="animation-delay: ${i * 200}ms">
          <!-- Small stat box -->
          <rect x="${xOffset}" y="${yOffset - 30}" width="340" height="40" fill="#111" class="pixel-border" />
          
          <!-- Label -->
          <text x="${xOffset + 15}" y="${yOffset - 5}" class="text-label" fill="${item.color}">${item.label}:</text>
          
          <!-- Value -->
          <text x="${xOffset + 200}" y="${yOffset - 5}" class="text-value">${item.value}</text>
        </g>
      `;
    })
    .join('');

  return `
    <svg width="800" height="240" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${pressStart2PFont}
        
        .bg { fill: #0d0d14; }
        .pixel-border { stroke-linecap: square; stroke-linejoin: miter; stroke: #333; stroke-width: 2; }
        
        .text-title { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 16px; fill: #00ffcc; text-shadow: 2px 2px #ff00ff; }
        .text-label { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 12px; }
        .text-value { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 14px; fill: #fff; }
        
        .scanline {
          fill: url(#scanline-pattern);
          opacity: 0.15;
          pointer-events: none;
        }
        
        .fade-in {
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
          transform: scale(0.9);
        }
        
        @keyframes popIn {
          to { opacity: 1; transform: scale(1); }
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
      <rect width="800" height="240" class="bg" rx="0" ${border} />
      
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
        <text x="40" y="40" class="text-title">PLAYER STATS</text>
        
        <!-- Stats Grid -->
        ${statsSvg}
      </g>
      
      <!-- Retro scanlines overlay -->
      <rect width="800" height="240" class="scanline" />
    </svg>
  `;
}
