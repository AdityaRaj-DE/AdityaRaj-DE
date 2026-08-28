import { CardOptions } from '../../types';
import { getTheme } from '../../themes';
import { pressStart2PFont } from '../../utils/fonts';

export function renderFooterCard(type: string, options: CardOptions): string {
  const theme = getTheme(options.theme);
  const border = options.hideBorder ? '' : `stroke="${theme.borderColor}" stroke-width="4"`;

  // Format the text based on the type
  const labelText = type.toUpperCase();
  const title = `[ ${labelText} ]`;

  // Choose an accent color based on the button type
  let accentColor = '#00ffcc'; // Default cyan

  if (type === 'linkedin') {
    accentColor = '#3178c6'; // Blueish
  } else if (type === 'email') {
    accentColor = '#ffea00'; // Yellow
  } else if (type === 'portfolio') {
    accentColor = '#ff00ff'; // Magenta
  }

  return `
    <svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${pressStart2PFont}
        
        .bg { fill: #0d0d14; transition: fill 0.3s ease; }
        .pixel-border { stroke-linecap: square; stroke-linejoin: miter; stroke: #333; stroke-width: 2; }
        
        .text-link { 
          font-family: 'Press Start 2P', 'Courier New', monospace; 
          font-size: 14px; 
          fill: ${accentColor}; 
        }
        
        /* Hover effect (only works if opened directly in browser, but nice to have) */
        svg:hover .bg { fill: #1a1a24; }
        
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
      <g>
        <rect width="250" height="60" class="bg" rx="0" ${border} />
        
        <!-- Button Text -->
        <text class="text-link" x="50%" y="36" text-anchor="middle">${title}</text>
        
        <!-- Retro scanlines overlay -->
        <rect width="250" height="60" class="scanline" />
      </g>
    </svg>
  `;
}
