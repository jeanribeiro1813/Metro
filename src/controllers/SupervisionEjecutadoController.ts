import { Request, Response } from 'express';

import FilterLoad from '../services/Supervision_Ejecutado/FilterLoad';


export default class SupervisionController {

  // Controllers são responsáveis apenas para abstração dos códios das rotas e
  // não devem possuir regra de negócio.

  // Na boa prática, um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete

  // Se possível, vamos  tentar seguir isso.
  // Claro que vai ter hora que vamos ter que criar mais,
  // porém isso é sinal que não estamos conseguindo abstrair direito as coisas.

  // Exemplo prático é o summary, abstraindo já deveria ser outra entidade.
  // Mas deixa aí por enquanto. 

  public async filter(request: Request, response: Response): Promise<Response> {

    const {actividad} = request.body;

    const loadSupervision = new FilterLoad();

    const supervision = await loadSupervision.filter({actividad});

    return response.json(supervision);
  }

}



