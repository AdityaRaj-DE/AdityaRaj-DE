import { Router } from 'express';
import { statsController, languagesController } from '../controllers/stats';

const router = Router();

router.get('/stats.svg', statsController);
router.get('/languages.svg', languagesController);

export default router;
