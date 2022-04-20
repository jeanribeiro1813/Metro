import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import SearchController from '../controllers/SearchController';

const searchRouter = Router();

const searchController = new SearchController();

searchRouter.use(ensureAuthenticated);

searchRouter.post('/execute', searchController.execute);

export default searchRouter;
