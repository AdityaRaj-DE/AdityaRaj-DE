import { Request, Response } from 'express';
import { getStatsSvg, getLanguagesSvg } from '../services/stats';
import { parseCardOptions } from '../utils/params';

export async function statsController(req: Request, res: Response) {
  try {
    const options = parseCardOptions(req.query);
    if (!options.username) {
      return res.status(400).send('Missing username parameter');
    }

    const svg = await getStatsSvg(options);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  } catch (error: any) {
    console.error('Error generating stats card:', error);
    res.status(500).send('Internal Server Error');
  }
}

export async function languagesController(req: Request, res: Response) {
  try {
    const options = parseCardOptions(req.query);
    if (!options.username) {
      return res.status(400).send('Missing username parameter');
    }

    const svg = await getLanguagesSvg(options);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  } catch (error: any) {
    console.error('Error generating languages card:', error);
    res.status(500).send('Internal Server Error');
  }
}
