import { Request, Response } from 'express';
import { getTechStackSvg } from '../../services/v2/techStack';
import { parseCardOptions } from '../../utils/params';

export async function techStackController(req: Request, res: Response) {
  try {
    const options = parseCardOptions(req.query);
    if (!options.username) {
      return res.status(400).send('Missing username parameter');
    }

    const svg = await getTechStackSvg(options);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  } catch (error: any) {
    console.error('Error generating tech stack card:', error);
    res.status(500).send('Internal Server Error');
  }
}
