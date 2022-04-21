import { getCustomRepository, getRepository } from 'typeorm'

import Actividades from '../../typeorm/entities/Actividades'

interface IRequestDTO {
    id: string;
}

class LoadActividadesFilterService{
    public async filter ({id}:IRequestDTO): Promise<Actividades[] | undefined> {
        
        const loadService =  getRepository(Actividades);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' id :: text  ilike :id', {id: `%${id}%`}).getMany();

        return cargoRepo;
    }
}

export default LoadActividadesFilterService;