import { CardOptions } from '../types';

export function parseCardOptions(query: Record<string, any>): CardOptions {
  return {
    username: query.username as string,
    theme: query.theme as string,
    hideBorder: query.hide_border === 'true',
    showIcons: query.show_icons !== 'false' // default true, matches behavior requested if applicable
  };
}
