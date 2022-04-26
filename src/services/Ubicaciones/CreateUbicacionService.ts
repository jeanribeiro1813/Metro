import {getCustomRepository} from 'typeorm'
import Ubicacion from '../../typeorm/entities/Ubicacion';
import UbicacionesRepository from '../../typeorm/repositories/UbicacionesRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {
  este:string;
  norte:string;
  ubicacion:string;
  sigla:string;
}

class CreateUbicacionService {

  public async execute({
    este,
    norte,
    ubicacion,
    sigla
  }: IRequestDTO): Promise<Ubicacion> {

    if (!(ubicacion && este && norte && sigla)) {
      throw new AppError('¡Por favor, inserte todas las entradas!');
    }

    const ubicacionesRepository = getCustomRepository(UbicacionesRepository);
    
    const checkUbicacionExists = await ubicacionesRepository.findByUbicacion(ubicacion);

    if (checkUbicacionExists) {
      throw new AppError('Ubicacion already exists.');
    }

    const newUbicacion = await ubicacionesRepository.create({
      este,
      norte,
      ubicacion,
      sigla
    });

    return newUbicacion;
  }
}

export default CreateUbicacionService;
