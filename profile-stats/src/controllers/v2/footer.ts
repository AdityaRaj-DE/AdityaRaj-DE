import { Request, Response } from 'express';
import { renderFooterCard } from '../../svg/v2/footerCard';
import { parseCardOptions } from '../../utils/params';

export async function footerController(req: Request, res: Response) {
  try {
    const options = parseCardOptions(req.query);
    const type = req.params.type as string; // 'portfolio', 'linkedin', or 'email'

    // Validate type
    if (!['portfolio', 'linkedin', 'email'].includes(type)) {
      return res.status(400).send('Invalid footer button type');
    }

    const svg = renderFooterCard(type, options);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(svg);
  } catch (error: any) {
    console.error('Error generating footer card:', error);
    res.status(500).send('Internal Server Error');
  }
}
