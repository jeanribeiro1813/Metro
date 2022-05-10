import { getCustomRepository } from 'typeorm'

import Ubicacion from '../../typeorm/entities/Ubicacion'
import UbicacionesRepository from '../../typeorm/repositories/UbicacionesRepository'

interface IRequestDTO {
    id: string;
}

class ShowUbicacionService{
    public async execute ({id}:IRequestDTO): Promise<Ubicacion | undefined> {
        
        const ubicacionesRepository = getCustomRepository(UbicacionesRepository);

        const ubicacion = await ubicacionesRepository.findById(id);

        return ubicacion;
    }
}

export default ShowUbicacionService;