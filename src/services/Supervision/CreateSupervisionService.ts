import {getCustomRepository} from 'typeorm'
import Supervision from '../../typeorm/entities/Supervision';
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository';
import AppError from '../../errors/AppError';



interface IRequestDTO {
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
  periodo: string;
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
  inicio_construccion:string  ;
}

class CreateSupervisionService {

  public async execute({
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
    
  }: IRequestDTO): Promise<Supervision> {
    
    if (!(ubicacion && e && n )) {
      throw new AppError(`¡Por favor, inserte todas las entradas! `);
    }

    // try{

      const supervisionRepository = getCustomRepository(SupervisionRepository);
    
      const checkSupervisionExists = await supervisionRepository.findByNomeclatura(nomenclatura);

      if (checkSupervisionExists?.length) {
        throw new AppError('Supervision already exists.');
        }

        const supervision = await supervisionRepository.create({
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
          
        });
    
        return supervision;
     
      // }
      
      // catch(error){
      //   throw new AppError(`${error}`);
      // }
   
  }
}

export default CreateSupervisionService;
