import { Request, Response } from 'express';

import CreateSSOMAPMTService from '../services/SSOMAPMT/CreateSSOMAPMTService';
import LoadSSOMAPMTService from '../services/SSOMAPMT/LoadSSOMAPMTService';
import ShowSSOMAPMTService from '../services/SSOMAPMT/ShowSSOMAPMTService';
import UpdateSSOMAPMTService from '../services/SSOMAPMT/UpdateSSOMAPMTService';
import DeleteSSOMAPMTService from '../services/SSOMAPMT/DeleteSSOMAPMTService'
import LoadLayersService from '../services/Layers/SetUpSSOMAPMTLayerService';
import LoadSSOMAPMTFilterService from '../services/SSOMAPMT/LoadSSOMAPMTFilterService';

export default class SSOMAPMTController {

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
    const loadSSOMAPMT = new LoadSSOMAPMTService();

    const SSOMAPMT = await loadSSOMAPMT.execute();


    return response.json(SSOMAPMT);
  }

  public async create(request: Request, response: Response){

    const { id,
      user,
      ubicacion,
      e,
      n,
      fecha,
      atividades,
      categoria,
      inconsistencia,
      acciones,
      imagen1,
      descrimg1,
      imagen2,
      descrimg2,
      imagen3,
      descrimg3,
      imagen4,
      descrimg4,
      imagen5,
      descrimg5,
      imagen6 ,
      descrimg6,
      imagen7,
      descrimg7,
      imagen8,
      descrimg8,
    } = request.body;
    
    const createSSOMAPMT = new CreateSSOMAPMTService();

    const SSOMAPMT = await createSSOMAPMT.execute(
      { 
        id,
    user,
    ubicacion,
    e,
    n,
    fecha,
    atividades,
    inconsistencia,
    acciones,
    categoria,
    imagen1,
    descrimg1,
    imagen2,
    descrimg2,
    imagen3,
    descrimg3,
    imagen4,
    descrimg4,
    imagen5,
    descrimg5,
    imagen6 ,
    descrimg6,
    imagen7,
    descrimg7,
    imagen8,
    descrimg8,
      }
    );
    
    return response.json(SSOMAPMT);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const {id} = request.params;

    const ShowSSOMAPMT = new ShowSSOMAPMTService();

    const SSOMAPMT = await ShowSSOMAPMT.execute({id});

    return response.json(SSOMAPMT);
  }

  public async update(request: Request , response: Response){


    const{  id,
      user,
      ubicacion,
      e,
      n,
      fecha,
      atividades,
      inconsistencia,
      acciones,
      categoria,
      imagen1,
      descrimg1,
      imagen2,
      descrimg2,
      imagen3,
      descrimg3,
      imagen4,
      descrimg4,
      imagen5,
      descrimg5,
      imagen6 ,
      descrimg6,
      imagen7,
      descrimg7,
      imagen8,
      descrimg8,
    } = request.body;

    const updateSSOMAPMT = new UpdateSSOMAPMTService();

    const SSOMAPMT = await updateSSOMAPMT.execute(
      {
        id,
    user,
    ubicacion,
    e,
    n,
    fecha,
    atividades,
    inconsistencia,
    acciones,
    categoria,
    imagen1,
    descrimg1,
    imagen2,
    descrimg2,
    imagen3,
    descrimg3,
    imagen4,
    descrimg4,
    imagen5,
    descrimg5,
    imagen6 ,
    descrimg6,
    imagen7,
    descrimg7,
    imagen8,
    descrimg8,
      }
    );

    return response.json(SSOMAPMT);


  }

  public async delete(request: Request , response: Response){

    const { id }  = request.params;

    const deleteDepartamento = new DeleteSSOMAPMTService();

   await deleteDepartamento.remove({id});

    return response.json('Delete realizado com sucesso');
  }

  public async summary(request: Request, response: Response): Promise<Response> {

    const loadSSOMAPMTSummary = new LoadLayersService();
    const summary = await loadSSOMAPMTSummary.execute({});

    return response.json(summary);
  }

  public async filtro(request: Request, response: Response): Promise<Response> {

    const {categoria} = request.body

    const loadSSOMAPMTSummary = new LoadSSOMAPMTFilterService();
    
    const summary = await loadSSOMAPMTSummary.filter({categoria});

    return response.json(summary);
  }

  

}



