import { Router } from 'express';

import ActividadesController from '../controllers/ActividadesController';
// import PiloteImageController from '../controllers/PiloteImageController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import {celebrate, Joi, Segments} from 'celebrate';

const actividadesRouter = Router();

const actividadesController = new ActividadesController();
// const piloteImageController = new PiloteImageController();


actividadesRouter.use(ensureAuthenticated);

actividadesRouter.get('/summary', actividadesController.index);

actividadesRouter.post('/create', actividadesController.create);

actividadesRouter.get('/index/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}), actividadesController.show);

actividadesRouter.put('/update/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}),actividadesController.update);

actividadesRouter.delete('/delete/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}),actividadesController.delete);


actividadesRouter.post('/filter',celebrate({
    [Segments.BODY]:{
        id: Joi.string().required()
    }
}),actividadesController.filtro)


export default actividadesRouter;
