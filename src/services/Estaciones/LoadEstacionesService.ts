import { getCustomRepository } from 'typeorm'
import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository'
import Estacion from '../../typeorm/entities/Estacion'

class LoadPilotesService{
    public async execute (): Promise<Estacion[] | undefined> {
        
        const estacionesRepository = getCustomRepository(EstacionesRepository);

        const estaciones = await estacionesRepository.index();

        return estaciones;
    }
}

export default LoadPilotesService;