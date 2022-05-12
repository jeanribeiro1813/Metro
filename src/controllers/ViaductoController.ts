import { Request, Response } from 'express';

import LoadViaductoService from '../services/Viaducto/LoadViaductoService';
import LoadViaductoFilterService from '../services/Viaducto/LoadViaductoFilterService';
import ShowViaductoService from '../services/Viaducto/ShowViaductoService';
import UpdateViaductoService from '../services/Viaducto/UpdateViaductoService';
import  DeleteViaductoService from '../services/Viaducto/DeleteViaductoService';
import  CreateViaductoService from '../services/Viaducto/CreateViaductoService';

export default class UbicacionesController {
  // Controllers são responsáveis apenas para abstração dos códios das rotas e
  // não devem possuir regra de negócio.

  // Na boa prática, um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete

  // Se possível, vamos  tentar seguir isso.
  // Claro que vai ter hora que vamos ter que criar mais,
  // porém isso é sinal que não estamos conseguindo abstrair direito as coisas.
  public async index(request: Request, response: Response): Promise<Response> {

    const load = new LoadViaductoService();

    const viaducto = await load.execute();

    return response.json(viaducto);
  }

  public async create(request: Request, response: Response){

    const {
      id,
      codigo,
      descripcion
    } = request.body;
    
    const createUbicacion = new CreateViaductoService();

    const createdUbicacion = await createUbicacion.execute(
      { 
        id,
        codigo,
        descripcion
      }
    );
    
    return response.json(createdUbicacion);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const {id} = request.params;

    const show = new ShowViaductoService();

    const viaducto = await show.execute({id});

    return response.json(viaducto);
  }

  public async update(request: Request , response: Response){

    const {id} = request.params

    const{
      codigo,
      descripcion
    } = request.body;

    const updateUbicacion = new UpdateViaductoService();

    const updatedUbicacion = await updateUbicacion.execute(
      {
        id,
        codigo,
        descripcion
      }
    );

    return response.json(updatedUbicacion);
  }

  public async delete(request: Request , response: Response){

    const {id} = request.params;

    const deleteUbicacion = new DeleteViaductoService();

    await deleteUbicacion.remove({id})

    return response.json('Delete Realizado com sucesso');
  }

  public async filter(request: Request , response: Response){

    const {codigo} = request.body;

    const result = new LoadViaductoFilterService();

    const viaducto = await result.filter({codigo})

    return response.json(viaducto);
  }

}
