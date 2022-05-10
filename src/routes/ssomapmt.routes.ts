import { Router } from 'express';
import multer from 'multer';

import ssomaPmtController from '../controllers/SSOMAPMTController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';
import {celebrate, Joi, Segments} from 'celebrate';

const SSOMAPMTRouter = Router();

const upload = multer(uploadConfig.multer);

const SSOMAPMTController = new ssomaPmtController();

SSOMAPMTRouter.use(ensureAuthenticated);

SSOMAPMTRouter.get('/summary', SSOMAPMTController.index);

// SSOMAPMTRouter.get('/index', SSOMAPMTController.index);
SSOMAPMTRouter.post('/create', SSOMAPMTController.create);

SSOMAPMTRouter.get('/index/:id',celebrate({
    [Segments.PARAMS]:{
        id:Joi.string().required(),
    }
}), SSOMAPMTController.show);

SSOMAPMTRouter.put('/update/:id',SSOMAPMTController.update);
SSOMAPMTRouter.delete('/delete/:id',SSOMAPMTController.delete);
SSOMAPMTRouter.get('/all', SSOMAPMTController.summary);

SSOMAPMTRouter.post('/Filter',celebrate({
    [Segments.BODY]:{
        categoria: Joi.string().required()
    }
}),SSOMAPMTController.filtro)



export default SSOMAPMTRouter;
