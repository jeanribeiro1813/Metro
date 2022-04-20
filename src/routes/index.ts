import {Router} from 'express';

import pilotesRoutes from './pilotes.routes';
import usuariosRouter from './usuarios.routes'
import estacionesRouter from './estaciones.routes';
import sessionsRouter from './sessions.routes';
import layersRouter from './layers.routes';
import profileRouter from './profile.routes';
import searchRoutes from './search.routes';
import reportRoutes from './reports.route';
import pmtRoutes from './pmt.routes'
import accionesRoutes from './acciones.routes'
import actividadesRoutes from './actividades.routes';
import inconsistenciaRoutes from './incosistencia.routes';

const routes = Router();

routes.use('/pilotes',pilotesRoutes);
routes.use('/usuarios',usuariosRouter);
routes.use('/estaciones',estacionesRouter);
routes.use('/sessions',sessionsRouter);
routes.use('/layers',layersRouter);
routes.use('/profile',profileRouter);
routes.use('/search',searchRoutes);
routes.use('/reports',reportRoutes);
routes.use('/pmt',pmtRoutes);
routes.use('/acciones',accionesRoutes);
routes.use('/actividades',actividadesRoutes);
routes.use('/inconsistencia',inconsistenciaRoutes);




export default routes;