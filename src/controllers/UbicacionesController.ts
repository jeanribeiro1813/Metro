import { Request, Response } from 'express';

import LoadUbicacionesService from '../services/Ubicaciones/LoadUbicacionService';
import CreateUbicacionService from '../services/Ubicaciones/CreateUbicacionService';
import ShowUbicacionService from '../services/Ubicaciones/ShowUbicacionService';
import UpdateUbicacionService from '../services/Ubicaciones/UpdateUbicacionService';
import  DeleteUbicacionService from '../services/Ubicaciones/DeleteUbicacionService';

export default class UbicacionesController {
  // Controllers são responsáveis apenas para abstração dos códios das rotas e
  // não devem possuir regra de negócio.

  // Na boa prática, um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete

  // Se possível, vamos  tentar seguir isso.
  // Claro que vai ter hora que vamos ter que criar mais,
  // porém isso é sinal que não estamos conseguindo abstrair direito as coisas.
  public async index(request: Request, response: Response): Promise<Response> {

    const loadUbicaciones = new LoadUbicacionesService();

    const ubicaciones = await loadUbicaciones.execute();

    return response.json(ubicaciones);
  }

  public async create(request: Request, response: Response){

    const {
      este,
      norte,
      ubicacion,
      sigla
    } = request.body;
    
    const createUbicacion = new CreateUbicacionService();

    const createdUbicacion = await createUbicacion.execute(
      { 
        este,
        norte,
        ubicacion,
        sigla
      }
    );
    
    return response.json(createdUbicacion);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const {id} = request.params;

    const showUbicacion = new ShowUbicacionService();

    const ubicacion = await showUbicacion.execute({id});

    return response.json(ubicacion);
  }

  public async update(request: Request , response: Response){

    const {id} = request.params

    const{
      
      este,
      norte,
      ubicacion,
      img_1_obs,
      img_2_obs,
      img_3_obs
    } = request.body;

    const updateUbicacion = new UpdateUbicacionService();

    const updatedUbicacion = await updateUbicacion.execute(
      {
        id,
        este,
        norte,
        ubicacion,
        img_1_obs,
        img_2_obs,
        img_3_obs
      }
    );

    return response.json(updatedUbicacion);
  }

  public async delete(request: Request , response: Response){

    const {id} = request.params;

    const deleteUbicacion = new DeleteUbicacionService();

    await deleteUbicacion.remove({id})

    return response.json('Delete Realizado com sucesso');
  }

}
