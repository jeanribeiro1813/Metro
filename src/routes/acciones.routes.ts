import { Router } from 'express';

import AccionesController from '../controllers/AccionesController';
// import SupervisionImageController from '../controllers/SupervisionImageController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import {celebrate, Joi, Segments} from 'celebrate';

const accionesRouter = Router();

const accionesController = new AccionesController();
// const supervisionImageController = new SupervisionImageController();


accionesRouter.use(ensureAuthenticated);

accionesRouter.get('/summary', accionesController.index);

accionesRouter.post('/create', accionesController.create);

accionesRouter.get('/index/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}), accionesController.show);

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

accionesRouter.post('/filter',celebrate({
    [Segments.BODY]:{
        id: Joi.string().required()
    }
}),accionesController.filtro)


export default accionesRouter;
