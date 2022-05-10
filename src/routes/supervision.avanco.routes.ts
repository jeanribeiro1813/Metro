import { Router } from 'express';

import SupervisionAvancoController from '../controllers/SupervisionAvancoController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import {celebrate, Joi, Segments} from 'celebrate';

const supervisionRouter = Router();

const supervisionAvancoController = new SupervisionAvancoController();


supervisionRouter.use(ensureAuthenticated);

supervisionRouter.post('/filter', celebrate({
    [Segments.BODY]:{
        avanco:Joi.string().required(),
    }
}),
supervisionAvancoController.filter);


export default supervisionRouter;
/*
supervisionRouter.patch(
    '/images',
    ensureAuthenticated,
    upload.array('images',3),
    supervisionImageController.update,
);
*/
