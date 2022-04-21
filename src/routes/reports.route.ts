import { Router } from 'express';

import ReporterPilotesController from '../controllers/Reports/ReporterPilotesController';
import {celebrate, Joi, Segments} from 'celebrate';

const router = Router();

const reportPilotesController = new ReporterPilotesController();

router.get('/index/:id', reportPilotesController.showId);
router.get('/summary', reportPilotesController.showFull);

router.post('/filter',celebrate({
    [Segments.BODY]:{
        fim_perfu:Joi.string().required()
    }
}), reportPilotesController.ShowFilter);


export default router;
