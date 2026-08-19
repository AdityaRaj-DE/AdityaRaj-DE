import { Router } from 'express';
import { statsController, languagesController } from '../controllers/stats';
import { headerController } from '../controllers/v2/header';

const router = Router();

router.get('/stats.svg', statsController);
router.get('/languages.svg', languagesController);

// V2 endpoints
router.get('/v2/header.svg', headerController);

export default router;
