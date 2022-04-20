import { getCustomRepository } from 'typeorm'
import Pilote from '../../typeorm/entities/Pilote'
import PilotesRepository from '../../typeorm/repositories/PilotesRepository'

import AppError from '../../errors/AppError';

interface IRequestDTO {
    id:string;
    ordem_serv?:string,
    mod_viaduto?:string,
    locali?:string;
    descri?:string;
    tipologia?:string;
    pilha?:string;
    e?:string;
    n?: string;
    subcontra?:string;
    parede_guia?:string;
    inicio_perfu?:string;
    fim_perfu?:string;
    vazio?:string;
    cls?:string;
    long_metro?:string;
    diam?:string;
    rend_metro_dia?: string;
    status?:string;
    maquina?:string;
    ensaio_csl?:string;
    obs?:string;
    img_1?:string;
    img_2?:string;
    img_3?:string;
    img_1_obs?:string;
    img_2_obs?:string;
    img_3_obs?:string;
    actividad?:string;
}

class UpdatePiloteService{
    public async execute(
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
        }:IRequestDTO
    ): Promise<Pilote | undefined>
    {
        const pilotesRepository = getCustomRepository(PilotesRepository);

        const pilote = await pilotesRepository.findById(id);

        if(!pilote){
            throw new AppError('Pilote does not exists!'); 
        }

        pilote.ordem_serv = ordem_serv ? ordem_serv : pilote.ordem_serv;
        pilote.mod_viaduto  = mod_viaduto ? mod_viaduto : pilote.mod_viaduto;
        pilote.locali = locali ? locali : pilote.locali;
        pilote.descri = descri ? descri : pilote.descri;
        pilote.tipologia = tipologia ? tipologia : pilote.tipologia;
        pilote.pilha = pilha ? pilha : pilote.pilha;
        pilote.e = e ? e : pilote.e;
        pilote.n = n ? n : pilote.n;
        pilote.subcontra = subcontra ? subcontra : pilote.subcontra;
        pilote.parede_guia = parede_guia ? parede_guia : pilote.parede_guia;
        pilote.inicio_perfu = inicio_perfu ? inicio_perfu : pilote.inicio_perfu;
        pilote.fim_perfu = fim_perfu ? fim_perfu : pilote.fim_perfu;
        pilote.vazio = vazio ? vazio : pilote.vazio;
        pilote.cls = cls ? cls : pilote.cls;
        pilote.long_metro = long_metro ? long_metro : pilote.long_metro;
        pilote.diam = diam ? diam : pilote.diam;
        pilote.rend_metro_dia = rend_metro_dia ? rend_metro_dia : pilote.rend_metro_dia;
        pilote.status = status ? status : pilote.status;
        pilote.maquina = maquina ? maquina : pilote.maquina;
        pilote.ensaio_csl = ensaio_csl ? ensaio_csl : pilote.ensaio_csl;
        pilote.obs = obs ? obs : pilote.obs;
        pilote.img_1 = img_1 ? img_1 : pilote.img_1;
        pilote.img_2 = img_2 ? img_2 : pilote.img_2;
        pilote.img_3 = img_3 ? img_3 : pilote.img_3;
        pilote.img_1_obs = img_1_obs ? img_1_obs : pilote.img_1_obs;
        pilote.img_2_obs = img_2_obs ? img_2_obs : pilote.img_2_obs;
        pilote.img_3_obs = img_3_obs ? img_3_obs : pilote.img_3_obs;
        pilote.actividad = actividad ? actividad : pilote.actividad;

        await pilotesRepository.save(pilote);

        return pilote;
     
    }
}


export default UpdatePiloteService;

