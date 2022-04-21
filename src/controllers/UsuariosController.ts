import { Request, Response } from 'express';

import CreateUserService  from "../services/Users/CreateUserService";
import DeleteUserService from '../services/Users/DeleteUserService';


export default class UsuariosController {
    // Controllers são responsáveis apenas para abstração dos códios das rotas e
    // não devem possuir regra de negócio.
  
    // Na boa prática, um CONTROLLER deve ter no máximo 5 métodos:
    // index, show, create, update, delete

    // Se possível, vamos  tentar seguir isso.
    // Claro que vai ter hora que vamos ter que criar mais,
    // porém isso é sinal que não estamos conseguindo abstrair direito as coisas.

    // Tipo, nem sempre precisamos ter os cinco métodos.
    // Exemplo prático: Aqui não faz sentido ter o index,
    // se fizermos isso pode vazar todos os usuários em uma única requisição.
    // Aí já era! F total! X.X

    // No futuro realmente vamos precisar ter uma gestão de usuários no dashboard,
    // mas lá vamos provavelmente vamos dividir o usuário em duas outras entidades:
    // user = profiles + password.

    // Normalmente também não faz-se o delete (mas deixa aí por enquanto).
    // Na prática os dados do usuário continuam para manter histórico.
    // Porém o usuário fica desabilitado.

    //Criação user
    public async create(request: Request, response: Response){

      const {nombre, profesion, email, acesso, contrasena, user_situa, contacto} = request.body;
      
      const createUser = new CreateUserService();

      const user = await createUser.execute(
        { 
          nombre,
          profesion,
          email,
          acesso,
          contrasena,
          user_situa,
          contacto
        }
      );
      
      return response.json(user);
    }

    //Detelete Usuario
    public async delete(request: Request , response: Response){

      const { id }  = request.params;
  
      const deleteuser = new DeleteUserService();
  
      deleteuser.remove({id});
  
      return response.json('Delete realizado com sucesso');
    }
  
}