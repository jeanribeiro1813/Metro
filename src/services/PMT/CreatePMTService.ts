import {getCustomRepository} from 'typeorm'
import PMT from '../../typeorm/entities/PMT';
import PMTRepository from '../../typeorm/repositories/PMTRepository';
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

class CreatePMTService {

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
   

  }: IRequestDTO): Promise<PMT> {
    
    const pmtRepository = getCustomRepository(PMTRepository);
    
    const checkPMTExists = await pmtRepository.findById(id);

    if (!checkPMTExists) {

      if (checkPMTExists) {
        throw new AppError('PMT already exists.',404);
      }

    }

    const pmt = await pmtRepository.create({
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

    return pmt;
  }
}

export default CreatePMTService;
