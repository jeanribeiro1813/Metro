import { Request, Response } from 'express';

import LoadPilotesService from '../services/Pilotes/LoadPilotesService';
import CreatePiloteService from '../services/Pilotes/CreatePiloteService';
import ShowPiloteService from '../services/Pilotes/ShowPiloteService';
import UpdatePiloteService from '../services/Pilotes/UpdatePiloteService';
import LoadPilotesSummaryService from '../services/Layers/SetUpPilotesLayerService';
import DeletePiloteService from '../services/Pilotes/DeletePilotesService';
import LoadPilotesFilterService from '../services/Pilotes/LoadPilotesFilterService';


export default class PilotesController {

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
    const loadPilotes = new LoadPilotesService();

    const pilotes = await loadPilotes.execute();

    return response.json(pilotes);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    
    const {id} = request.params
    
    const loadPilotes = new DeletePiloteService();

    await loadPilotes.remove({id});

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
    
    const createPilote = new CreatePiloteService();

    const pilote = await createPilote.execute(
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
    
    return response.json(pilote);
  }

  public async show(request: Request, response: Response): Promise<Response> {

    const {id} = request.params ;

    const showPilote = new ShowPiloteService();

    const pilote = await showPilote.execute({id});

    return response.json(pilote);
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

    const updatePilote = new UpdatePiloteService();

    const pilote = await updatePilote.execute(
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

    return response.json(pilote);


  }

  public async summary(request: Request, response: Response): Promise<Response> {
    const loadPilotesSummary = new LoadPilotesSummaryService();
    const summary = await loadPilotesSummary.execute({});

    return response.json(summary);
  }


  public async filtro(request: Request, response: Response): Promise<Response> {

    const {actividad} = request.body;

    const loadPilotes = new LoadPilotesFilterService();
    
    const loadfilter = await loadPilotes.filter({actividad});

    return response.json(loadfilter);
  }


}



