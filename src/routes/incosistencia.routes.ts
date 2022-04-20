import { Router } from 'express';

import InconsistenciaController from '../controllers/InconsistenciaController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import {celebrate, Joi, Segments} from 'celebrate';

const inconsistenciaRouter = Router();

const inconsistenciaController = new InconsistenciaController();

inconsistenciaRouter.use(ensureAuthenticated);

inconsistenciaRouter.get('/load', inconsistenciaController.index);

inconsistenciaRouter.post('/create', inconsistenciaController.create);
inconsistenciaRouter.post('/show', inconsistenciaController.show);
inconsistenciaRouter.put('/update/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}),inconsistenciaController.update);

inconsistenciaRouter.delete('/delete/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}),inconsistenciaController.delete);

export default inconsistenciaRouter;
