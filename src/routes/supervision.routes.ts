import { Router } from 'express';
import multer from 'multer';

import SupervisionController from '../controllers/SupervisionController';
import SupervisionImageController from '../controllers/SupervisionImageController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import {celebrate, Joi, Segments} from 'celebrate';

const supervisionRouter = Router();

const upload = multer(uploadConfig.multer);

const supervisionController = new SupervisionController();
const supervisionImageController = new SupervisionImageController();


supervisionRouter.use(ensureAuthenticated);

supervisionRouter.get('/summary', supervisionController.index);
supervisionRouter.post('/create', supervisionController.create);

supervisionRouter.get('/index/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}), supervisionController.show);

supervisionRouter.put('/update/:id',supervisionController.update);
supervisionRouter.get('/all', supervisionController.summary);

supervisionRouter.delete('/delete/:id',supervisionController.delete);

supervisionRouter.post('/filter', celebrate({
    [Segments.BODY]:{
        actividad:Joi.string().required(),
    }
}),
supervisionController.filtro);


supervisionRouter.patch(
    '/image',
    ensureAuthenticated,
    upload.single('image'),
    supervisionImageController.update,
);

export default supervisionRouter;
/*
supervisionRouter.patch(
    '/images',
    ensureAuthenticated,
    upload.array('images',3),
    supervisionImageController.update,
);
*/
