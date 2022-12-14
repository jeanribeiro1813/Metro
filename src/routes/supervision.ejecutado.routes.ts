import { Router } from 'express';

import SupervisionEjeculadoController from '../controllers/SupervisionEjecutadoController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import {celebrate, Joi, Segments} from 'celebrate';

const supervisionRouter = Router();

const supervisionEjeculadoController = new SupervisionEjeculadoController();


supervisionRouter.use(ensureAuthenticated);

supervisionRouter.post('/filter', celebrate({
    [Segments.BODY]:{
        actividad:Joi.string().required(),
    }
}),
supervisionEjeculadoController.filter);


export default supervisionRouter;
/*
supervisionRouter.patch(
    '/images',
    ensureAuthenticated,
    upload.array('images',3),
    supervisionImageController.update,
);
*/
