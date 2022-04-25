import { Request, Response } from 'express';

import AuthenticateUserService from '../services/Sessions/AuthenticateUserService';

export default class SessionsController {
  // Controllers são responsáveis apenas para abstração dos códios das rotas e
  // não devem possuir regra de negócio.
  
  // Na boa prática, um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete

  // Se possível, vamos  tentar seguir isso.
  // Claro que vai ter hora que vamos ter que criar mais,
  // porém isso é sinal que não estamos conseguindo abstrair direito as coisas.
  public async create(request: Request, response: Response): Promise<Response> {

    const { email, contrasena } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      contrasena,
    });

    return response.json({user,  token });
  }
}
