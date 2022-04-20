import { Router } from 'express';

import AccionesController from '../controllers/AccionesController';
// import PiloteImageController from '../controllers/PiloteImageController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import {celebrate, Joi, Segments} from 'celebrate';

const accionesRouter = Router();

const accionesController = new AccionesController();
// const piloteImageController = new PiloteImageController();


accionesRouter.use(ensureAuthenticated);

accionesRouter.get('/load', accionesController.index);

accionesRouter.post('/create', accionesController.create);
accionesRouter.post('/show', accionesController.show);
accionesRouter.put('/update/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}),accionesController.update);

accionesRouter.delete('/delete/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}),accionesController.delete);

export default accionesRouter;
