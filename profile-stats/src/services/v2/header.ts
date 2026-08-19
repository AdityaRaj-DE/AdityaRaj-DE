import { fetchUserStats } from '../../github/client';
import { cache } from '../../cache';
import { config } from '../../config/env';
import { CardOptions } from '../../types';
import { renderHeaderCard } from '../../svg/v2/headerCard';

export async function getHeaderSvg(options: CardOptions): Promise<string> {
  const cacheKey = `header_${options.username}`;
  let stats = await cache.get<any>(cacheKey);

  if (!stats) {
    stats = await fetchUserStats(options.username);

    // Fetch avatar as base64 to ensure it renders in GitHub's Camo proxy
    try {
      const response = await fetch(stats.avatarUrl);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      stats.avatarBase64 = `data:${response.headers.get('content-type') || 'image/jpeg'};base64,${buffer.toString('base64')}`;
    } catch (e) {
      console.error('Failed to fetch avatar base64', e);
      stats.avatarBase64 = '';
    }

    await cache.set(cacheKey, stats, config.cacheTtlSeconds);
  }

  return renderHeaderCard(stats, options);
}
