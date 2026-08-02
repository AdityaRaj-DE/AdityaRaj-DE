import { TopLanguages, CardOptions } from '../types';
import { getTheme } from '../themes';

export function renderLanguagesCard(data: TopLanguages, options: CardOptions): string {
  const theme = getTheme(options.theme);
  const border = options.hideBorder ? '' : `stroke="${theme.borderColor}" stroke-width="1"`;

  const height = 180;
  const width = 300;
  
  let languagesHtml = '';
  let yOffset = 0;

  for (const lang of data.languages) {
    const percentage = ((lang.size / data.totalSize) * 100).toFixed(1);
    languagesHtml += `
      <g transform="translate(0, ${yOffset})">
        <circle cx="5" cy="6" r="5" fill="${lang.color}" />
        <text class="lang-name" x="15" y="10">${lang.name}</text>
        <text class="lang-percent" x="150" y="10">${percentage}%</text>
      </g>
    `;
    yOffset += 25;
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${theme.titleColor}; }
        .lang-name { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${theme.textColor}; }
        .lang-percent { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${theme.textColor}; }
      </style>
      <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" fill="${theme.bgColor}" rx="4.5" ${border}/>
      <text x="25" y="35" class="header">Most Used Languages</text>
      
      <g transform="translate(25, 55)">
        ${languagesHtml}
      </g>
    </svg>
  `;
}
