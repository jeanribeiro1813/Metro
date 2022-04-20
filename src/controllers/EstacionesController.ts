import { Request, Response } from 'express';

import LoadEstacionesService from '../services/Estaciones/LoadEstacionesService';
import CreateEstacionService from '../services/Estaciones/CreateEstacionService';
import ShowEstacionService from '../services/Estaciones/ShowEstacionService';
import UpdateEstacionService from '../services/Estaciones/UpdateEstacionService';

export default class EstacionesController {
  // Controllers são responsáveis apenas para abstração dos códios das rotas e
  // não devem possuir regra de negócio.

  // Na boa prática, um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete

  // Se possível, vamos  tentar seguir isso.
  // Claro que vai ter hora que vamos ter que criar mais,
  // porém isso é sinal que não estamos conseguindo abstrair direito as coisas.
  public async index(request: Request, response: Response): Promise<Response> {

    const loadEstaciones = new LoadEstacionesService();

    const estaciones = await loadEstaciones.execute();

    return response.json(estaciones);
  }

  public async create(request: Request, response: Response){

    const {
      este,
      norte,
      estacion
    } = request.body;
    
    const createEstacion = new CreateEstacionService();

    const createdEstacion = await createEstacion.execute(
      { 
        este,
        norte,
        estacion
      }
    );
    
    return response.json(createdEstacion);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const {id} = request.body;

    const showEstacion = new ShowEstacionService();

    const estacion = await showEstacion.execute({id});

    return response.json(estacion);
  }

  public async update(request: Request , response: Response){

    const{
      id,
      este,
      norte,
      estacion,
      img_1_obs,
      img_2_obs,
      img_3_obs
    } = request.body;

    const updateEstacion = new UpdateEstacionService();

    const updatedEstacion = await updateEstacion.execute(
      {
        id,
        este,
        norte,
        estacion,
        img_1_obs,
        img_2_obs,
        img_3_obs
      }
    );

    return response.json(updatedEstacion);
  }

  public async delete(request: Request , response: Response){

    const {id} = request.params;

    return response.json({"teste":id});
  }

}
