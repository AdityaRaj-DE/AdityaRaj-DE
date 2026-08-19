import { GitHubStats, CardOptions } from '../types';
import { getTheme } from '../themes';

export function renderStatsCard(stats: GitHubStats, options: CardOptions): string {
  const theme = getTheme(options.theme);
  const border = options.hideBorder ? '' : `stroke="${theme.borderColor}" stroke-width="1"`;

  // Provide simple fallback for icons
  const iconPaths = {
    star: 'M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z',
    commits:
      'M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z',
    repos:
      'M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z',
    followers:
      'M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416 1.338 5.468 5.468 0 012.246 2.463.75.75 0 101.332-.705 6.969 6.969 0 00-2.868-3.141A3 3 0 0011 4z'
  };

  const drawIcon = (path: string) =>
    options.showIcons
      ? `<svg x="25" viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill="${theme.iconColor}" fill-rule="evenodd" d="${path}"></path></svg>`
      : '';
  const textX = options.showIcons ? '55' : '25';

  return `
    <svg width="495" height="195" viewBox="0 0 495 195" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${theme.titleColor}; }
        .stat { font: 400 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${theme.textColor}; }
        .stagger { animation: fadeInAnimation 0.3s ease-in-out forwards; }
        @keyframes fadeInAnimation {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      <rect x="0.5" y="0.5" width="494" height="194" fill="${theme.bgColor}" rx="4.5" ${border}/>
      <text x="25" y="35" class="header">${stats.name}'s GitHub Stats</text>
      
      <g transform="translate(0, 55)">
        <g transform="translate(0, 0)">
          <g class="stagger" style="animation-delay: 150ms">
            ${drawIcon(iconPaths.star)}
            <text class="stat" x="${textX}" y="12.5">Total Stars:</text>
            <text class="stat" x="170" y="12.5" font-weight="600">${stats.totalStars}</text>
          </g>
        </g>
        <g transform="translate(0, 30)">
          <g class="stagger" style="animation-delay: 300ms">
            ${drawIcon(iconPaths.commits)}
            <text class="stat" x="${textX}" y="12.5">Total Commits:</text>
            <text class="stat" x="170" y="12.5" font-weight="600">${stats.totalCommits}</text>
          </g>
        </g>
        <g transform="translate(0, 60)">
          <g class="stagger" style="animation-delay: 450ms">
            ${drawIcon(iconPaths.repos)}
            <text class="stat" x="${textX}" y="12.5">Total Repositories:</text>
            <text class="stat" x="170" y="12.5" font-weight="600">${stats.totalRepositories}</text>
          </g>
        </g>
        <g transform="translate(0, 90)">
          <g class="stagger" style="animation-delay: 600ms">
            ${drawIcon(iconPaths.followers)}
            <text class="stat" x="${textX}" y="12.5">Followers:</text>
            <text class="stat" x="170" y="12.5" font-weight="600">${stats.totalFollowers}</text>
          </g>
        </g>
      </g>
    </svg>
  `;
}
