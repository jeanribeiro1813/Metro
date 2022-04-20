import { Request, Response } from 'express';

import CreatePMTService from '../services/PMT/CreatePMTService';
import LoadPMTService from '../services/PMT/LoadPMTService';
import ShowPMTService from '../services/PMT/ShowPMTService';
import UpdatePMTService from '../services/PMT/UpdatePMTService';
import DeletePMTService from '../services/PMT/DeletePMTService'
import LoadLayersService from '../services/Layers/SetUpPMTLayerService';

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
    const loadPMT = new LoadPMTService();

    const pmt = await loadPMT.execute();


    return response.json(pmt);
  }

  public async create(request: Request, response: Response){

    const { id,
      user,
      ubicacion,
      e,
      n,
      fecha,
      atividades,
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
    
    const createPmt = new CreatePMTService();

    const pmt = await createPmt.execute(
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
    
    return response.json(pmt);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const {id} = request.body;

    const ShowPmt = new ShowPMTService();

    const pmt = await ShowPmt.execute({id});

    return response.json(pmt);
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

    const updatePmt = new UpdatePMTService();

    const pmt = await updatePmt.execute(
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

    return response.json(pmt);


  }

  public async delete(request: Request , response: Response){

    const { id }  = request.params;

    const deleteDepartamento = new DeletePMTService();

   deleteDepartamento.remove({id});

    return response.json('Delete realizado com sucesso');
  }

  public async summary(request: Request, response: Response): Promise<Response> {

    const loadPMTSummary = new LoadLayersService();
    const summary = await loadPMTSummary.execute({});

    return response.json(summary);
  }

  

}



