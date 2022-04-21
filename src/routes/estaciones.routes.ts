import { Router } from 'express';
import multer from 'multer';

import EstacionesController from '../controllers/EstacionesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import EstacionImageController from '../controllers/EstacionImageController';
import {celebrate, Joi, Segments} from 'celebrate';

const estacionesRouter = Router();

const upload = multer(uploadConfig.multer);

const estacionesController = new EstacionesController();
const estacionImageController = new EstacionImageController();

estacionesRouter.use(ensureAuthenticated);

estacionesRouter.get('/summary', estacionesController.index);
estacionesRouter.post('/create', estacionesController.create);

estacionesRouter.get('/index/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}), estacionesController.show);
//Cara, deixei o show e update como post por enquanto pq foi mais rápido,
//depois precisamos corrigir essa verbalização
estacionesRouter.put('/update/:id',estacionesController.update);

estacionesRouter.delete('/delete/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}),estacionesController.delete);


estacionesRouter.patch(
    '/image',
    ensureAuthenticated,
    upload.single('image'),
    estacionImageController.update,
);


export default estacionesRouter;