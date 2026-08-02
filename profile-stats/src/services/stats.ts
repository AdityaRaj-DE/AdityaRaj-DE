import { fetchUserStats, fetchUserLanguages } from '../github/client';
import { renderStatsCard } from '../svg/statsCard';
import { renderLanguagesCard } from '../svg/languagesCard';
import { cache } from '../cache';
import { config } from '../config/env';
import { CardOptions } from '../types';

export async function getStatsSvg(options: CardOptions): Promise<string> {
  const cacheKey = `stats_${options.username}`;
  let stats = await cache.get<any>(cacheKey);

  if (!stats) {
    stats = await fetchUserStats(options.username);
    await cache.set(cacheKey, stats, config.cacheTtlSeconds);
  }

  return renderStatsCard(stats, options);
}

export async function getLanguagesSvg(options: CardOptions): Promise<string> {
  const cacheKey = `langs_${options.username}`;
  let langs = await cache.get<any>(cacheKey);

  if (!langs) {
    langs = await fetchUserLanguages(options.username);
    await cache.set(cacheKey, langs, config.cacheTtlSeconds);
  }

  return renderLanguagesCard(langs, options);
}
