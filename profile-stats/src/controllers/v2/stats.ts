import { Request, Response } from 'express';
import { fetchUserStats } from '../../github/client';
import { cache } from '../../cache';
import { config } from '../../config/env';
import { renderStatsCard } from '../../svg/v2/statsCard';
import { parseCardOptions } from '../../utils/params';

export async function v2StatsController(req: Request, res: Response) {
  try {
    const options = parseCardOptions(req.query);

    // Add caching layer
    const cacheKey = `stats_${options.username}`;
    let stats = await cache.get<any>(cacheKey);

    if (!stats) {
      stats = await fetchUserStats(options.username);
      await cache.set(cacheKey, stats, config.cacheTtlSeconds);
    }

    const svg = renderStatsCard(stats, options);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  } catch (error: any) {
    console.error('Error generating V2 stats card:', error);
    res.status(500).send('Internal Server Error');
  }
}
