import {Router} from 'express';

import supervisionRoutes from './supervision.routes';
import usuariosRouter from './usuarios.routes'
import ubicacionesRouter from './ubicaciones.routes';
import sessionsRouter from './sessions.routes';
import layersRouter from './layers.routes';
import profileRouter from './profile.routes';
import searchRoutes from './search.routes';
import reportRoutes from './reports.route';
import SSOMAPMTRoutes from './ssomapmt.routes'
import accionesRoutes from './acciones.routes'
import actividadesRoutes from './actividades.routes';
import inconsistenciaRoutes from './incosistencia.routes';
import supervisionRouter from './supervision.avanco.routes'

const routes = Router();

routes.use('/supervision',supervisionRoutes);
routes.use('/usuarios',usuariosRouter);
routes.use('/ubicaciones',ubicacionesRouter);
routes.use('/sessions',sessionsRouter);
routes.use('/layers',layersRouter);
routes.use('/profile',profileRouter);
routes.use('/search',searchRoutes);
routes.use('/reports',reportRoutes);
routes.use('/ssomaypmt',SSOMAPMTRoutes);
routes.use('/acciones',accionesRoutes);
routes.use('/actividades',actividadesRoutes);
routes.use('/inconsistencia',inconsistenciaRoutes);
routes.use('/supervisionAvanco',supervisionRouter);




export default routes;