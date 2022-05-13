import { Router } from 'express';

import ReporterSupervisionController from '../controllers/Reports/ReporterController';
import {celebrate, Joi, Segments} from 'celebrate';

const router = Router();

const reportSupervisionController = new ReporterSupervisionController();

router.get('/index/:id', reportSupervisionController.showId);
router.get('/summary', reportSupervisionController.showFull);

router.post('/filter',celebrate({
    [Segments.BODY]:{
        
        fin:Joi.string().required(),
        actividad:Joi.string().required()
    }
}), reportSupervisionController.ShowFilter);


export default router;
