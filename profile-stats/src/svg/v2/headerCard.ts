import { GitHubStats, CardOptions } from '../../types';
import { getTheme } from '../../themes';
import { pressStart2PFont } from '../../utils/fonts';

export function renderHeaderCard(stats: GitHubStats, options: CardOptions): string {
  const theme = getTheme(options.theme);
  const border = options.hideBorder ? '' : `stroke="${theme.borderColor}" stroke-width="4"`;

  // Base64 avatar or fallback to GitHub camo URL
  const avatarImage = stats.avatarBase64 || stats.avatarUrl;
  const escapeXml = (unsafe: string) =>
    unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

  const bio = escapeXml(stats.bio || 'A mysterious GitHub user.');

  // Word wrap bio (max 55 chars per line)
  const words = bio.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + word).length > 55) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine.trim()) lines.push(currentLine.trim());

  // Show up to 2 lines of bio
  const displayLines = lines.slice(0, 2);
  if (lines.length > 2) {
    displayLines[1] = displayLines[1].replace(/.{3}$/, '...');
  }

  const bioSvg = displayLines
    .map((line, i) => `<tspan x="180" dy="${i === 0 ? 0 : 20}">${line}</tspan>`)
    .join('');

  return `
    <svg width="800" height="200" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <style>
        ${pressStart2PFont}
        
        .bg { fill: #0d0d14; }
        .pixel-border { stroke-linecap: square; stroke-linejoin: miter; }
        .text-title { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 24px; fill: #00ffcc; text-shadow: 2px 2px #ff00ff; }
        .text-bio { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 10px; fill: #e0e0e0; line-height: 1.5; }
        .text-stats { font-family: 'Press Start 2P', 'Courier New', monospace; font-size: 10px; fill: #ff00ff; }
        
        .avatar {
          image-rendering: pixelated;
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
      </style>

      <defs>
        <pattern id="scanline-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="2" fill="#000" />
        </pattern>
        
        <clipPath id="avatar-clip">
          <rect x="30" y="30" width="120" height="120" rx="0" />
        </clipPath>
      </defs>

      <!-- Background -->
      <rect width="800" height="200" class="bg" rx="0" ${border} />
      
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
        <!-- Avatar with retro border -->
        <rect x="26" y="26" width="128" height="128" fill="#ff00ff" />
        <rect x="28" y="28" width="124" height="124" fill="#00ffcc" />
        <image x="30" y="30" width="120" height="120" href="${avatarImage}" clip-path="url(#avatar-clip)" class="avatar" />

        <!-- Title / Username -->
        <text x="180" y="65" class="text-title">${escapeXml(stats.name || '')}</text>
        <text x="182" y="90" class="text-stats">@${escapeXml(stats.login || '')}</text>

        <!-- Bio text -->
        <text x="180" y="125" class="text-bio">${bioSvg}</text>
        
        <!-- Stats summary in pixel style -->
        <text x="180" y="170" class="text-stats">LVL ${Math.floor(stats.totalCommits / 100) + 1}</text>
        <text x="340" y="170" class="text-bio">REPOS: ${stats.totalRepositories}</text>
        <text x="500" y="170" class="text-bio">STARS: ${stats.totalStars}</text>
        <text x="660" y="170" class="text-bio">FOLLOWS: ${stats.totalFollowers}</text>
      </g>
      
      <!-- Retro scanlines overlay -->
      <rect width="800" height="200" class="scanline" />
    </svg>
  `;
}
