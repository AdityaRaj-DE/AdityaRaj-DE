import express from 'express';
import { config } from '../config/env';
import apiRoutes from './routes';

const app = express();

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.send('OK');
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`Profile Stats Service running on port ${config.port}`);
  });
}

export default app;
