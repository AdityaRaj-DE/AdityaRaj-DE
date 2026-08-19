import { Request, Response } from 'express';
import { renderInterestsCard } from '../../svg/v2/interestsCard';
import { parseCardOptions } from '../../utils/params';

export async function interestsController(req: Request, res: Response) {
  try {
    const options = parseCardOptions(req.query);
    const svg = renderInterestsCard(options);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  } catch (error: any) {
    console.error('Error generating interests card:', error);
    res.status(500).send('Internal Server Error');
  }
}
