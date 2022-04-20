import { getCustomRepository, getRepository } from 'typeorm';

import Pilote from '../../typeorm/entities/Pilote'
import PilotesRepository from '../../typeorm/repositories/PilotesRepository'


interface IRequestDTO {
    
    id:string
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
  
  }

class LoadPilotesService{

    public async execute (): Promise<Pilote[] | undefined> {
        
        const pilotesRepository = getRepository(Pilote);

        const pilotes = await pilotesRepository.find({});
 
        const summary = pilotes.map((use) =>{
            const DescItemOfSummary = {
                
                id: use?.id,
                actividad: use?.actividad,
                ordem_serv: use?.ordem_serv,
                mod_viaduto: use?.mod_viaduto,
                locali: use?.locali,
                descri: use?.descri,
                tipologia: use?.tipologia,
                pilha: use?.pilha,
                e: use?.e,
                n: use?.n,
                subcontra: use?.subcontra,
                parede_guia: use?.parede_guia,
                inicio_perfu: use?.inicio_perfu,
                fim_perfu: use?.fim_perfu,
                vazio: use?.vazio,
                cls: use?.cls,
                long_metro: use?.long_metro,
                diam: use?.diam,
                rend_metro_dia: use?.rend_metro_dia,
                status: use?.status,
                maquina: use?.maquina,
                ensaio_csl: use?.ensaio_csl,
                obs: use?.obs,



            }
            return DescItemOfSummary;
            }

        )

        const responseDTO = {
            summary,
        };

        return responseDTO.summary;
    }
}

export default LoadPilotesService;