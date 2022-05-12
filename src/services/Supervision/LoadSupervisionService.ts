import { getCustomRepository, getRepository } from 'typeorm';

import Supervision from '../../typeorm/entities/Supervision'
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'


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
  inicio_construccion:string;
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

  
  }

class LoadSupervisionService{

    public async execute (): Promise<Supervision[] | undefined> {
        
        const supervisionRepository = getRepository(Supervision);

        const supervision = await supervisionRepository.find({});
 
        const summary = supervision.map((use) =>{
            const DescItemOfSummary = {
                
                id: use?.id,
                chave: use?.chave,
                orden:use?.orden,
                modulacion_viaducto:use?.modulacion_viaducto,
                sector:use?.sector,
                estructura:use?.estructura,
                ubicacion:use?.ubicacion,
                descripcion:use?.descripcion,
                tipologia_cimentacion:use?.tipologia_cimentacion,
                nomenclatura:use?.nomenclatura,
                actividad:use?.actividad,
                armadura20:use?.armadura20,
                ejecucion50:use?.ejecucion50,
                liberacion30:use?.liberacion30,
                contratista:use?.contratista,
                subcontratista:use?.subcontratista,
                muro_guia:use?.muro_guia,
                periodo:use?.periodo,
                inicio_perforacion:use?.inicio_perforacion,
                inicio_construccion:use?.inicio_construccion,
                fin_perforacion:use?.fin_perforacion,
                vaciado:use?.vaciado,
                csl:use?.csl,
                descabezado:use?.descabezado,
                longitud:use?.longitud,
                diametro:use?.diametro,
                rend_perforacion:use?.rend_perforacion,
                duracion_vaciado:use?.duracion_vaciado,
                duracion_vaciado_csl:use?.duracion_vaciado_csl,
                estatus:use?.estatus,
                estatus_csl:use?.estatus_csl,
                nota:use?.nota,
                maquina:use?.maquina,
                ensaio_csl:use?.ensaio_csl,
                observaciones :use?.observaciones,
                n:use?.n,
                e:use?.e,
                img_1:use?.img_1,
                img_2:use?.img_2,
                img_3:use?.img_3,
                img_1_obs:use?.img_1_obs,
                img_2_obs:use?.img_2_obs,
                img_3_obs:use?.img_3_obs,
              



            }
            return DescItemOfSummary;
            }

        )

        const responseDTO : any = {
            summary,
        };

        return responseDTO.summary;
    }
}

export default LoadSupervisionService;