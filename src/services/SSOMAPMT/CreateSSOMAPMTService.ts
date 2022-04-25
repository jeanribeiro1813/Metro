import {getCustomRepository} from 'typeorm'
import SSOMAPMT from '../../typeorm/entities/SSOMAPMT';
import SSOMAPMTRepository from '../../typeorm/repositories/SSOMAPMTRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {

  id:string,
  user:string,
  ubicacion:string;
  e:string;
  n:string;
  fecha:string
  atividades:string;
  inconsistencia:string;
  acciones:string;
  categoria:string;
  imagen1:string;
  descrimg1:string;
  imagen2: string;
  descrimg2:string;
  imagen3:string;
  descrimg3:string;
  imagen4:string;
  descrimg4:string;
  imagen5:string;
  descrimg5:string;
  imagen6 :string;
  descrimg6: string;
  imagen7:string;
  descrimg7:string;
  imagen8:string;
  descrimg8:string;
 

}

class CreateSSOMAPMTService {

  public async execute({
    id,
    user,
    ubicacion,
    e,
    n,
    fecha,
    atividades,
    inconsistencia,
    acciones,
    categoria,
    imagen1,
    descrimg1,
    imagen2,
    descrimg2,
    imagen3,
    descrimg3,
    imagen4,
    descrimg4,
    imagen5,
    descrimg5,
    imagen6 ,
    descrimg6,
    imagen7,
    descrimg7,
    imagen8,
    descrimg8,
   

  }: IRequestDTO): Promise<SSOMAPMT> {
    
    const ssomapmtTRepository = getCustomRepository(SSOMAPMTRepository);
    
    const checkSSOMAPMTExists = await ssomapmtTRepository.findById(id);

    if (!checkSSOMAPMTExists) {

      if (checkSSOMAPMTExists) {
        throw new AppError('SSOMAPMT already exists.',404);
      }

    }

    const SSOMAPMT = await ssomapmtTRepository.create({
      id,
      user,
      ubicacion,
      e,
      n,
      fecha,
      atividades,
      inconsistencia,
      acciones,
      categoria,
      imagen1,
      descrimg1,
      imagen2,
      descrimg2,
      imagen3,
      descrimg3,
      imagen4,
      descrimg4,
      imagen5,
      descrimg5,
      imagen6 ,
      descrimg6,
      imagen7,
      descrimg7,
      imagen8,
      descrimg8,
    });

    return SSOMAPMT;
  }
}

export default CreateSSOMAPMTService;
