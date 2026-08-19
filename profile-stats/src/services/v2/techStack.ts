import { fetchUserLanguages } from '../../github/client';
import { cache } from '../../cache';
import { config } from '../../config/env';
import { CardOptions } from '../../types';
import { renderTechStackCard } from '../../svg/v2/techStackCard';

export async function getTechStackSvg(options: CardOptions): Promise<string> {
  const cacheKey = `v2_langs_${options.username}`;
  let langs = await cache.get<any>(cacheKey);

  if (!langs) {
    langs = await fetchUserLanguages(options.username);
    await cache.set(cacheKey, langs, config.cacheTtlSeconds);
  }

  return renderTechStackCard(langs, options);
}
