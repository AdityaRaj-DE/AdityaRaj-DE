import express from 'express';
import { config } from '../config/env';
import apiRoutes from './routes';

const app = express();

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(config.port, () => {
  console.log(`Profile Stats Service running on port ${config.port}`);
});
