import { Router } from 'express';
import multer from 'multer';

import PMTController from '../controllers/PMTController';
// import PiloteImageController from '../controllers/PiloteImageController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const pmtRouter = Router();

const upload = multer(uploadConfig.multer);

const pmtController = new PMTController();
// const piloteImageController = new PiloteImageController();


pmtRouter.use(ensureAuthenticated);

pmtRouter.get('/all', pmtController.index);

// pmtRouter.get('/index', pmtController.index);
pmtRouter.post('/create', pmtController.create);
pmtRouter.post('/show', pmtController.show);
pmtRouter.put('/update/:id',pmtController.update);
pmtRouter.delete('/delete/:id',pmtController.delete);
pmtRouter.get('/summary', pmtController.summary);

// pmtRouter.patch(
//     '/image',
//     ensureAuthenticated,
//     upload.single('image'),
//     piloteImageController.update,
// );

export default pmtRouter;
/*
pmtRouter.patch(
    '/images',
    ensureAuthenticated,
    upload.array('images',3),
    piloteImageController.update,
);
*/