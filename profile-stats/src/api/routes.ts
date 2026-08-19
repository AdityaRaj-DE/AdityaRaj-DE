import { Router } from 'express';
import { statsController, languagesController } from '../controllers/stats';
import { headerController } from '../controllers/v2/header';
import { techStackController } from '../controllers/v2/techStack';
import { projectsController } from '../controllers/v2/projects';
import { footerController } from '../controllers/v2/footer';

const router = Router();

router.get('/stats.svg', statsController);
router.get('/languages.svg', languagesController);

// V2 endpoints
router.get('/v2/header.svg', headerController);
router.get('/v2/tech-stack.svg', techStackController);
router.get('/v2/projects.svg', projectsController);
router.get('/v2/footer/:type.svg', footerController);

export default router;
