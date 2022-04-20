import { Router } from 'express';

import LayersController from '../controllers/LayersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const layersRouter = Router();

const layersController = new LayersController();

layersRouter.use(ensureAuthenticated);

layersRouter.get('/index',layersController.index);
layersRouter.post('/index',layersController.view);

export default layersRouter;
