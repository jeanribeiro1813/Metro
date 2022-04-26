import { getCustomRepository } from 'typeorm'
import UbicacionesRepository from '../../typeorm/repositories/UbicacionesRepository'
import Ubicacion from '../../typeorm/entities/Ubicacion'

class LoadSupervisionService{
    public async execute (): Promise<Ubicacion[] | undefined> {
        
        const ubicacionesRepository = getCustomRepository(UbicacionesRepository);

        const ubicaciones = await ubicacionesRepository.index();

        return ubicaciones;
    }
}

export default LoadSupervisionService;