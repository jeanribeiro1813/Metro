import {getCustomRepository} from 'typeorm'
import Supervision from '../../typeorm/entities/Supervision';
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository';
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

class CreateSupervisionService {

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
    
  }: IRequestDTO): Promise<Supervision> {
    
    if (!(locali && e && n && pilha)) {
      throw new AppError('¡Por favor, inserte todas las entradas!');
    }
    const supervisionRepository = getCustomRepository(SupervisionRepository);
    
    const checkSupervisionExists = await supervisionRepository.findByPilha(pilha);

    if (checkSupervisionExists) {
      throw new AppError('Supervision already exists.');
    }

    const supervision = await supervisionRepository.create({
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

    return supervision;
  }
}

export default CreateSupervisionService;
