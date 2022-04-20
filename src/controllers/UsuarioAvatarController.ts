import { Request, Response } from 'express';

import AppError from '../errors/AppError';

import UpdateUserAvatarService from '../services/Users/UpdateUserAvatarService';

export default class UsuarioAvatarController {
  // Um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = new UpdateUserAvatarService();
    if(request.file){
      const updatedUser = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatar_filename: request.file.filename,
      })
      updatedUser.contrasena = "";
      return response.json(updatedUser);
    }else{
      throw new AppError(
        '¡Por favor inserta una imagen!',
        400,
      );
    }
  }
}
