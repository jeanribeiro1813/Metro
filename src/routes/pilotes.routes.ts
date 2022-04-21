import { Router } from 'express';
import multer from 'multer';

import PilotesController from '../controllers/PilotesController';
import PiloteImageController from '../controllers/PiloteImageController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import {celebrate, Joi, Segments} from 'celebrate';

const pilotesRouter = Router();

const upload = multer(uploadConfig.multer);

const pilotesController = new PilotesController();
const piloteImageController = new PiloteImageController();


pilotesRouter.use(ensureAuthenticated);

pilotesRouter.get('/summary', pilotesController.index);
pilotesRouter.post('/create', pilotesController.create);

pilotesRouter.get('/index/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}), pilotesController.show);

pilotesRouter.put('/update/:id',pilotesController.update);
pilotesRouter.get('/all', pilotesController.summary);

pilotesRouter.delete('/delete/:id',pilotesController.delete);

pilotesRouter.post('/filter', celebrate({
    [Segments.BODY]:{
        actividad:Joi.string().required(),
    }
}),
pilotesController.filtro);


pilotesRouter.patch(
    '/image',
    ensureAuthenticated,
    upload.single('image'),
    piloteImageController.update,
);

export default pilotesRouter;
/*
pilotesRouter.patch(
    '/images',
    ensureAuthenticated,
    upload.array('images',3),
    piloteImageController.update,
);
*/
