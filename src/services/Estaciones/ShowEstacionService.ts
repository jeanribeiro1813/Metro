import { getCustomRepository } from 'typeorm'

import Estacion from '../../typeorm/entities/Estacion'
import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository'

interface IRequestDTO {
    id: string;
}

class ShowEstacionService{
    public async execute ({id}:IRequestDTO): Promise<Estacion | undefined> {
        
        const estacionesRepository = getCustomRepository(EstacionesRepository);

        const estacion = await estacionesRepository.findById(id);

        return estacion;
    }
}

export default ShowEstacionService;