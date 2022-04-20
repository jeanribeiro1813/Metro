import { Router } from 'express';

import ReporterPilotesController from '../controllers/Reports/ReporterPilotesController';
import ReporterColumnsController from '../controllers/Reports/ReporterColumnsController';
import {celebrate, Joi, Segments} from 'celebrate';

const router = Router();

const reportPilotesController = new ReporterPilotesController();
const reportColumnsController = new ReporterColumnsController();

router.get('/pilotes/:id', reportPilotesController.showId);
router.get('/pilotes', reportPilotesController.showFull);
router.post('/piloteFilter',celebrate({
    [Segments.BODY]:{
        fim_perfu:Joi.string().required()
    }
}), reportPilotesController.ShowFilter);


router.get('/columns/:id', reportColumnsController.showId);
router.get('/columns', reportColumnsController.showFull);

export default router;
