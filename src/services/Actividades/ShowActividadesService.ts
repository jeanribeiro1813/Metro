import { getCustomRepository } from 'typeorm'

import Actividades from '../../typeorm/entities/Actividades'
import ActividadesRepository from '../../typeorm/repositories/ActividadesRepository'

interface IRequestDTO {
    id: string;
}

class ShowLoadActividadesService{
    public async execute ({id}:IRequestDTO): Promise<Actividades | undefined> {
        
        const actividadeRepository = getCustomRepository(ActividadesRepository);

        const actividades = await actividadeRepository.findById(id);

        return actividades;
    }
}

export default ShowLoadActividadesService;