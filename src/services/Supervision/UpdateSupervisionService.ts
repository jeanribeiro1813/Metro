import { getCustomRepository } from 'typeorm'
import Supervision from '../../typeorm/entities/Supervision'
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'

import AppError from '../../errors/AppError';

interface IRequestDTO {
    id:string;
    chave: number;
      orden:number ;
      modulacion_viaducto:string   ;
      sector:string   ;
      estructura:string   ;
      ubicacion:string   ;
      descripcion:string ;
      tipologia_cimentacion:string  ;
      nomenclatura:string  ;
      actividad:string  ;
      armadura20:boolean  ;
      ejecucion50:boolean  ;
      liberacion30:boolean  ;
      contratista:string  ;
      subcontratista:string  ;
      muro_guia:string  ;
      periodo:string;
      inicio_perforacion:string  ;
      fin_perforacion:string  ;
      vaciado:string  ;
      csl:string  ;
      descabezado:string   ;
      longitud:number   ;
      diametro:number  ;
      rend_perforacion:number  ;
      duracion_vaciado:number ;
      duracion_vaciado_csl:string ;
      estatus:string ;
      estatus_csl:string ;
      nota:string ;
      maquina:string  ;
      ensaio_csl:string  ;
      observaciones :string   ;
      n:string  ;
      e:string  ;
      img_1:string  ;
      img_2:string  ;
      img_3:string  ;
      img_1_obs:string  ;
      img_2_obs:string;
      img_3_obs:string  ;
      inicio_construccion: string;
}

class UpdateSupervisionService{
    public async execute(
        {
            id,
            chave,
            orden,
            modulacion_viaducto,
            sector,
            estructura,
            ubicacion,
             descripcion,
            tipologia_cimentacion,
            nomenclatura,
            actividad,
            armadura20,
            ejecucion50,
            liberacion30,
            contratista,
            subcontratista,
            muro_guia,
            periodo,
            inicio_perforacion,
            fin_perforacion,
            vaciado,
            csl,
            descabezado,
            longitud,
            diametro,
            rend_perforacion,
            duracion_vaciado,
            duracion_vaciado_csl,
            estatus,
            estatus_csl,
            nota,
            maquina,
            ensaio_csl,
            observaciones,
            n,
            e,
            img_1,
            img_2,
            img_3,
            img_1_obs,
            img_2_obs,
            img_3_obs,
            inicio_construccion
        }:IRequestDTO
    ): Promise<Supervision | undefined>
    {
        const supervisionRepository = getCustomRepository(SupervisionRepository);

        const supervisionExisr = await supervisionRepository.findById(id);

        if(!supervisionExisr){
            throw new AppError('Supervision does not exists!'); 
        }

        supervisionExisr.chave = chave ? chave : supervisionExisr.chave;
        supervisionExisr.orden  = orden ? orden : supervisionExisr.orden;
        supervisionExisr.modulacion_viaducto = modulacion_viaducto ? modulacion_viaducto : supervisionExisr.modulacion_viaducto;
        supervisionExisr.sector = sector ? sector : supervisionExisr.sector;
        supervisionExisr.estructura = estructura ? estructura : supervisionExisr.estructura;
        supervisionExisr.ubicacion = ubicacion ? ubicacion : supervisionExisr.ubicacion;
        supervisionExisr.descripcion = descripcion ? descripcion : supervisionExisr.descripcion;
        supervisionExisr.tipologia_cimentacion = tipologia_cimentacion ? tipologia_cimentacion : supervisionExisr.tipologia_cimentacion;
        supervisionExisr.nomenclatura = nomenclatura ? nomenclatura : supervisionExisr.nomenclatura;
        supervisionExisr.actividad = actividad ? actividad : supervisionExisr.actividad;
        supervisionExisr.armadura20 = armadura20 ? armadura20 : supervisionExisr.armadura20;
        supervisionExisr.ejecucion50 = ejecucion50 ? ejecucion50 : supervisionExisr.ejecucion50;
        supervisionExisr.liberacion30 = liberacion30 ? liberacion30 : supervisionExisr.liberacion30;
        supervisionExisr.contratista = contratista ? contratista : supervisionExisr.contratista;
        supervisionExisr.subcontratista = subcontratista ? subcontratista : supervisionExisr.subcontratista;
        supervisionExisr.muro_guia = muro_guia ? muro_guia : supervisionExisr.muro_guia;
        supervisionExisr.periodo = periodo ? periodo : supervisionExisr.periodo;
        supervisionExisr.inicio_perforacion = inicio_perforacion ? inicio_perforacion : supervisionExisr.inicio_perforacion
        supervisionExisr.fin_perforacion = fin_perforacion ? fin_perforacion : supervisionExisr.fin_perforacion;
        supervisionExisr.vaciado = vaciado ? vaciado : supervisionExisr.vaciado;
        supervisionExisr.csl = csl ? csl : supervisionExisr.csl;
        supervisionExisr.descabezado = descabezado ? descabezado : supervisionExisr.descabezado;
        supervisionExisr.longitud = longitud ? longitud : supervisionExisr.longitud;
        supervisionExisr.diametro = diametro ? diametro : supervisionExisr.diametro;
        supervisionExisr.rend_perforacion = rend_perforacion ? rend_perforacion : supervisionExisr.rend_perforacion;
        supervisionExisr.duracion_vaciado = duracion_vaciado ? duracion_vaciado : supervisionExisr.duracion_vaciado;
        supervisionExisr.duracion_vaciado_csl = duracion_vaciado_csl ? duracion_vaciado_csl : supervisionExisr.duracion_vaciado_csl;
        supervisionExisr.estatus = estatus ? estatus : supervisionExisr.estatus;
        supervisionExisr.estatus_csl = estatus_csl ? estatus_csl : supervisionExisr.estatus_csl;
        supervisionExisr.nota = nota ? nota : supervisionExisr.nota;
        supervisionExisr.maquina = maquina ? maquina : supervisionExisr.maquina;
        supervisionExisr.ensaio_csl = ensaio_csl ? ensaio_csl : supervisionExisr.ensaio_csl;
        supervisionExisr.observaciones = observaciones ? observaciones : supervisionExisr.observaciones;
        supervisionExisr.n = n ? n : supervisionExisr.n;
        supervisionExisr.e = e ? e : supervisionExisr.e;
        supervisionExisr.img_1 = img_1 ? img_1 : supervisionExisr.img_1;
        supervisionExisr.img_2 = img_2 ? img_2 : supervisionExisr.img_2;
        supervisionExisr.img_3 = img_3 ? img_3 : supervisionExisr.img_3;
        supervisionExisr.img_1_obs = img_1_obs ? img_1_obs : supervisionExisr.img_1_obs;
        supervisionExisr.img_2_obs = img_2_obs ? img_2_obs : supervisionExisr.img_2_obs;
        supervisionExisr.img_3_obs = img_3_obs ? img_3_obs : supervisionExisr.img_3_obs;
        supervisionExisr.inicio_construccion = inicio_construccion ? inicio_construccion : supervisionExisr.inicio_construccion;
        



        await supervisionRepository.save(supervisionExisr);

        return supervisionExisr;
     
    }
}


export default UpdateSupervisionService;

