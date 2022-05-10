import { Request, Response } from 'express';

import LoadSupervisionService from '../services/Supervision/LoadSupervisionService';
import CreateSupervisionService from '../services/Supervision/CreateSupervisionService';
import ShowSupervisionService from '../services/Supervision/ShowSupervisionService';
import UpdateSupervisionService from '../services/Supervision/UpdateSupervisionService';
import LoadSupervisionSummaryService from '../services/Layers/SetUpSupervisionLayerService';
import DeleteSupervisionService from '../services/Supervision/DeleteSupervisionService';
import LoadSupervisionFilterService from '../services/Supervision/LoadSupervisionFilterService';


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

  public async index(request: Request, response: Response): Promise<Response> {
    const loadSupervision = new LoadSupervisionService();

    const supervision = await loadSupervision.execute();

    return response.json(supervision);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    
    const {id} = request.params
    
    const loadSupervision = new DeleteSupervisionService();

    await loadSupervision.remove({id});

    return response.json('Delete realizado com sucesso');
  }

  public async create(request: Request, response: Response){

    const {
      ordem_serv,
      mod_viaduto,
      locali,
      descri,
      tipologia,
      pilha,
      e,
      n,
      subcontra,
      parede_guia,
      inicio_perfu,
      fim_perfu,
      vazio,
      cls,
      long_metro,
      diam,
      rend_metro_dia,
      status,
      maquina,
      ensaio_csl,
      obs,
      img_1,
      img_2,
      img_3,
      actividad
    } = request.body;
    
    const createSupervision = new CreateSupervisionService();

    const supervision = await createSupervision.execute(
      { 
        ordem_serv,
        mod_viaduto,
        locali,
        descri,
        tipologia,
        pilha,
        e,
        n,
        subcontra,
        parede_guia,
        inicio_perfu,
        fim_perfu,
        vazio,
        cls,
        long_metro,
        diam,
        rend_metro_dia,
        status,
        maquina,
        ensaio_csl,
        obs,
        img_1,
        img_2,
        img_3,
        actividad
      }
    );
    
    return response.json(supervision);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const {id} = request.params ;

    const showSupervision = new ShowSupervisionService();

    const supervision = await showSupervision.execute({id});

    return response.json(supervision);
  }

  public async update(request: Request , response: Response){
    
    const {id} = request.params;

    const{
      ordem_serv,
      mod_viaduto,
      locali,
      descri,
      tipologia,
      pilha,
      e,
      n,
      subcontra,
      parede_guia,
      inicio_perfu,
      fim_perfu,
      vazio,
      cls,
      long_metro,
      diam,
      rend_metro_dia,
      status,
      maquina,
      ensaio_csl,
      obs,
      img_1,
      img_2,
      img_3,
      img_1_obs,
      img_2_obs,
      img_3_obs,
      actividad
    } = request.body;

    const updateSupervision = new UpdateSupervisionService();

    const supervision = await updateSupervision.execute(
      {
        id,
        ordem_serv,
        mod_viaduto,
        locali,
        descri,
        tipologia,
        pilha,
        e,
        n,
        subcontra,
        parede_guia,
        inicio_perfu,
        fim_perfu,
        vazio,
        cls,
        long_metro,
        diam,
        rend_metro_dia,
        status,
        maquina,
        ensaio_csl,
        obs,
        img_1,
        img_2,
        img_3,
        img_1_obs,
        img_2_obs,
        img_3_obs,
        actividad
      }
    );

    return response.json(supervision);


  }

  public async summary(request: Request, response: Response): Promise<Response> {
    const loadSupervisionSummary = new LoadSupervisionSummaryService();
    const summary = await loadSupervisionSummary.execute({});

    return response.json(summary);
  }


  public async filtro(request: Request, response: Response): Promise<Response> {

    const {actividad} = request.body;

    const loadSupervision = new LoadSupervisionFilterService();
    
    const loadfilter = await loadSupervision.filter({actividad});

    return response.json(loadfilter);
  }


}



