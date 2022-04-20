import {getCustomRepository} from 'typeorm'
import Estacion from '../../typeorm/entities/Estacion';
import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {
  este:string;
  norte:string;
  estacion:string;
}

class CreateEstacionService {

  public async execute({
    este,
    norte,
    estacion
  }: IRequestDTO): Promise<Estacion> {
    
    if (!(estacion && este && norte)) {
      throw new AppError('¡Por favor, inserte todas las entradas!');
    }

    const estacionesRepository = getCustomRepository(EstacionesRepository);
    
    const checkEstacionExists = await estacionesRepository.findByEstacion(estacion);

    if (checkEstacionExists) {
      throw new AppError('Estacion already exists.');
    }

    const newEstacion = await estacionesRepository.create({
      este,
      norte,
      estacion
    });

    return newEstacion;
  }
}

export default CreateEstacionService;
