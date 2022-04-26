import { Router } from 'express';
import multer from 'multer';

import UbicacionesController from '../controllers/UbicacionesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import UbicacionImageController from '../controllers/UbicacionImageController';
import {celebrate, Joi, Segments} from 'celebrate';

const ubicacionesRouter = Router();

const upload = multer(uploadConfig.multer);

const ubicacionesController = new UbicacionesController();
const ubicacionImageController = new UbicacionImageController();

ubicacionesRouter.use(ensureAuthenticated);

ubicacionesRouter.get('/summary', ubicacionesController.index);
ubicacionesRouter.post('/create', ubicacionesController.create);

ubicacionesRouter.get('/index/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}), ubicacionesController.show);
//Cara, deixei o show e update como post por enquanto pq foi mais rápido,
//depois precisamos corrigir essa verbalização
ubicacionesRouter.put('/update/:id',ubicacionesController.update);

ubicacionesRouter.delete('/delete/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}),ubicacionesController.delete);


ubicacionesRouter.patch(
    '/image',
    ensureAuthenticated,
    upload.single('image'),
    ubicacionImageController.update,
);


export default ubicacionesRouter;