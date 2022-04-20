import { Request, Response } from 'express';

import CreateAccionesService from '../services/Acciones/CreateAccionesService';
import LoadAccionesService from '../services/Acciones/LoadAccionesService';
import ShowAccionesService from '../services/Acciones/ShowAccionesService';
import UpdateAccionesService from '../services/Acciones/UpdateAccionesService';
import DeleteAccionesService from '../services/Acciones/DeleteAccionesService'

export default class PMTController {

  // Controllers são responsáveis apenas para abstração dos códios das rotas e
  // não devem possuir regra de negócio.

  // Na boa prática, um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete

  // Se possível, vamos  tentar seguir isso.
  // Claro que vai ter hora que vamos ter que criar mais,
  // porém isso é sinal que não estamos conseguindo abstrair direito as coisas.

  // Exemplo prático é o summary, abstraindo já deveria ser outra entidade.
  // Mas deixa aí por enquanto. 

  public async index(request: Request, response: Response): Promise<Response> {

    const loadAcciones = new LoadAccionesService();

    const acciones = await loadAcciones.execute();


    return response.json(acciones);
  }

  public async create(request: Request, response: Response){

    const { id,
      descripcion
    } = request.body;
    
    const createPmt = new CreateAccionesService();

    const pmt = await createPmt.execute(
      { 
        id,
        descripcion
      }
    );
    
    return response.json('Acciones Criado com sucesso');
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const {id} = request.body;

    const ShowAcciones = new ShowAccionesService();

    const acciones = await ShowAcciones.execute({id});

    return response.json(acciones);
  }

  public async update(request: Request , response: Response){

    const {id} = request.params;

    const{descripcion
    } = request.body;

    const updateAcciones = new UpdateAccionesService();

    const acciones = await updateAcciones.execute(
      {
        id,
        descripcion
      }
    );

    return response.json('Atualização realizada com sucesso');


  }

  public async delete(request: Request , response: Response){

    const { id }  = request.params;

    const deleteAcciones = new DeleteAccionesService();

    deleteAcciones.remove({id});

    return response.json('Delete realizado com sucesso');
  }



  

}



