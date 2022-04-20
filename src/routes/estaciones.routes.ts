import { Router } from 'express';
import multer from 'multer';

import EstacionesController from '../controllers/EstacionesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import EstacionImageController from '../controllers/EstacionImageController';

const estacionesRouter = Router();

const upload = multer(uploadConfig.multer);

const estacionesController = new EstacionesController();
const estacionImageController = new EstacionImageController();

estacionesRouter.use(ensureAuthenticated);

estacionesRouter.get('/index', estacionesController.index);
estacionesRouter.post('/create', estacionesController.create);
estacionesRouter.post('/show', estacionesController.show);
//Cara, deixei o show e update como post por enquanto pq foi mais rápido,
//depois precisamos corrigir essa verbalização
estacionesRouter.put('/update',estacionesController.update);

estacionesRouter.patch(
    '/image',
    ensureAuthenticated,
    upload.single('image'),
    estacionImageController.update,
);


export default estacionesRouter;