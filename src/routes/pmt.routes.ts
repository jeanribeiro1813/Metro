import { Router } from 'express';
import multer from 'multer';

import PMTController from '../controllers/PMTController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import {celebrate, Joi, Segments} from 'celebrate';

const pmtRouter = Router();

const upload = multer(uploadConfig.multer);

const pmtController = new PMTController();

pmtRouter.use(ensureAuthenticated);

pmtRouter.get('/summary', pmtController.index);

// pmtRouter.get('/index', pmtController.index);
pmtRouter.post('/create', pmtController.create);

pmtRouter.get('/index/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}), pmtController.show);

pmtRouter.put('/update/:id',pmtController.update);
pmtRouter.delete('/delete/:id',pmtController.delete);
pmtRouter.get('/all', pmtController.summary);

pmtRouter.post('/Filter',celebrate({
    [Segments.BODY]:{
        categoria: Joi.string().required()
    }
}),pmtController.filtro)



export default pmtRouter;
