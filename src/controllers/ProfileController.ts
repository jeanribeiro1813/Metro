import { Request, Response } from 'express';

import ShowProfileService from '../services/Users/ShowProfileService';
import UpdateProfileService from '../services/Users/UpdateProfileService';


export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response>{
    const {id} = request.user;

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({
      user_id:id,
    });
    user.contrasena="";
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const {id} = request.user;

    const {nombre, email, contacto, profesion, old_password, new_password } = request.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id:id,
      nombre,
      email,
      contacto,
      profesion,
      old_password,
      new_password
    });
    user.contrasena="";
    return response.json(user);
  }
}