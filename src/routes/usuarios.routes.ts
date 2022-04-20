import { Router } from 'express';
import multer from 'multer';

import UsuariosController from '../controllers/UsuariosController';
import UsuarioAvatarController from '../controllers/UsuarioAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '../config/upload';

const usuariosRouter = Router();

const upload = multer(uploadConfig.multer);

const usuariosController = new UsuariosController();
const usuarioAvatarController = new UsuarioAvatarController();

usuariosRouter.post('/create',usuariosController.create);

usuariosRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    usuarioAvatarController.update,
);

export default usuariosRouter;
