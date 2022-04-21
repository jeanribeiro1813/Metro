import { Request, Response } from 'express';

import CreateInconsistenciaService from '../services/Inconsistencia/CreateInconsistenciaService'
import LoadInconsistenciaService from '../services/Inconsistencia/LoadInconsistenciaService';
import ShowInconsistenciaService from '../services/Inconsistencia/ShowInconsistenciaService';
import UpdateInconsistenciaService from '../services/Inconsistencia/UpdateInconsistenciaService';
import DeleteInconsistenciaService from '../services/Inconsistencia/DeleteInconsistenciaService'

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

    const loadAcciones = new LoadInconsistenciaService();

    const acciones = await loadAcciones.execute();


    return response.json(acciones);
  }

  public async create(request: Request, response: Response){

    const { id,
      descripcion
    } = request.body;
    
    const createPmt = new CreateInconsistenciaService();

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

    const ShowAcciones = new ShowInconsistenciaService();

    const acciones = await ShowAcciones.execute({id});

    return response.json(acciones);
  }

  public async update(request: Request , response: Response){

    const {id} = request.params

    const{  
      descripcion
    } = request.body;

    const updateAcciones = new UpdateInconsistenciaService();

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

    const deleteAcciones = new DeleteInconsistenciaService();

    await deleteAcciones.remove({id});

    return response.json('Delete realizado com sucesso');
  }



  

}



