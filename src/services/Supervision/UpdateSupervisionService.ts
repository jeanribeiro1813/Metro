import { getCustomRepository } from 'typeorm'
import Supervision from '../../typeorm/entities/Supervision'
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'

import AppError from '../../errors/AppError';

interface IRequestDTO {
    id:string;
    ordem_serv?:string,
    mod_viaduto?:string,
    locali?:string;
    descri?:string;
    tipologia?:string;
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

class UpdateSupervisionService{
    public async execute(
        {
            id,
            ordem_serv,
            mod_viaduto,
            locali,
            descri,
            tipologia,
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
    ): Promise<Supervision | undefined>
    {
        const supervisionRepository = getCustomRepository(SupervisionRepository);

        const supervisionExisr = await supervisionRepository.findById(id);

        if(!supervisionExisr){
            throw new AppError('Supervision does not exists!'); 
        }

        supervisionExisr.ordem_serv = ordem_serv ? ordem_serv : supervisionExisr.ordem_serv;
        supervisionExisr.mod_viaduto  = mod_viaduto ? mod_viaduto : supervisionExisr.mod_viaduto;
        supervisionExisr.locali = locali ? locali : supervisionExisr.locali;
        supervisionExisr.descri = descri ? descri : supervisionExisr.descri;
        supervisionExisr.tipologia = tipologia ? tipologia : supervisionExisr.tipologia;
        supervisionExisr.e = e ? e : supervisionExisr.e;
        supervisionExisr.n = n ? n : supervisionExisr.n;
        supervisionExisr.subcontra = subcontra ? subcontra : supervisionExisr.subcontra;
        supervisionExisr.parede_guia = parede_guia ? parede_guia : supervisionExisr.parede_guia;
        supervisionExisr.inicio_perfu = inicio_perfu ? inicio_perfu : supervisionExisr.inicio_perfu;
        supervisionExisr.fim_perfu = fim_perfu ? fim_perfu : supervisionExisr.fim_perfu;
        supervisionExisr.vazio = vazio ? vazio : supervisionExisr.vazio;
        supervisionExisr.cls = cls ? cls : supervisionExisr.cls;
        supervisionExisr.long_metro = long_metro ? long_metro : supervisionExisr.long_metro;
        supervisionExisr.diam = diam ? diam : supervisionExisr.diam;
        supervisionExisr.rend_metro_dia = rend_metro_dia ? rend_metro_dia : supervisionExisr.rend_metro_dia;
        supervisionExisr.status = status ? status : supervisionExisr.status;
        supervisionExisr.maquina = maquina ? maquina : supervisionExisr.maquina;
        supervisionExisr.ensaio_csl = ensaio_csl ? ensaio_csl : supervisionExisr.ensaio_csl;
        supervisionExisr.obs = obs ? obs : supervisionExisr.obs;
        supervisionExisr.img_1 = img_1 ? img_1 : supervisionExisr.img_1;
        supervisionExisr.img_2 = img_2 ? img_2 : supervisionExisr.img_2;
        supervisionExisr.img_3 = img_3 ? img_3 : supervisionExisr.img_3;
        supervisionExisr.img_1_obs = img_1_obs ? img_1_obs : supervisionExisr.img_1_obs;
        supervisionExisr.img_2_obs = img_2_obs ? img_2_obs : supervisionExisr.img_2_obs;
        supervisionExisr.img_3_obs = img_3_obs ? img_3_obs : supervisionExisr.img_3_obs;
        supervisionExisr.actividad = actividad ? actividad : supervisionExisr.actividad;

        await supervisionRepository.save(supervisionExisr);

        return supervisionExisr;
     
    }
}


export default UpdateSupervisionService;

