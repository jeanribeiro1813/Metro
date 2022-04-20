import {getCustomRepository} from 'typeorm'
import Pilote from '../../typeorm/entities/Pilote';
import PilotesRepository from '../../typeorm/repositories/PilotesRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {
  actividad:string,
  ordem_serv:string,
  mod_viaduto:string,
  locali:string;
  descri:string;
  tipologia:string;
  pilha:string;
  e:string;
  n: string;
  subcontra:string;
  parede_guia:string;
  inicio_perfu:string;
  fim_perfu:string;
  vazio:string;
  cls:string;
  long_metro:string;
  diam:string;
  rend_metro_dia: string;
  status:string;
  maquina:string;
  ensaio_csl:string;
  obs:string;
  img_1:string;
  img_2:string;
  img_3:string;
}

class CreatePiloteService {

  public async execute({
    actividad,
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
    
  }: IRequestDTO): Promise<Pilote> {
    
    if (!(locali && e && n && pilha)) {
      throw new AppError('¡Por favor, inserte todas las entradas!');
    }
    const pilotesRepository = getCustomRepository(PilotesRepository);
    
    const checkPiloteExists = await pilotesRepository.findByPilha(pilha);

    if (checkPiloteExists) {
      throw new AppError('Pilha already exists.');
    }

    const pilote = await pilotesRepository.create({
      actividad,
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
      
    });

    return pilote;
  }
}

export default CreatePiloteService;
