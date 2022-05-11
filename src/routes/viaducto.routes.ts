import { Router } from 'express';
import multer from 'multer';

import ViaductoController from '../controllers/ViaductoController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import {celebrate, Joi, Segments} from 'celebrate';

const viaductoRouter = Router();

const upload = multer(uploadConfig.multer);

const viaductoController = new ViaductoController();

viaductoRouter.use(ensureAuthenticated);

viaductoRouter.get('/summary', viaductoController.index);
viaductoRouter.post('/create', viaductoController.create);

viaductoRouter.get('/index/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}), viaductoController.show);
//Cara, deixei o show e update como post por enquanto pq foi mais rápido,
//depois precisamos corrigir essa verbalização
viaductoRouter.put('/update/:id',viaductoController.update);

viaductoRouter.delete('/delete/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}),viaductoController.delete);


viaductoRouter.post('/filter',celebrate({
    [Segments.BODY]:{
        cod:Joi.string().required(),
    }
}),viaductoController.filter)

export default viaductoRouter;