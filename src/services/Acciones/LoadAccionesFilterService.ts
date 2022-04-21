import { getCustomRepository, getRepository } from 'typeorm'

import Acciones from '../../typeorm/entities/Acciones'

interface IRequestDTO {
    id: string;
}

class LoadAccionesFilterService{
    public async filter ({id}:IRequestDTO): Promise<Acciones[] | undefined> {
        
        const loadService =  getRepository(Acciones);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' id :: text  ilike :id', {id: `%${id}%`}).getMany();

        return cargoRepo;
    }
}

export default LoadAccionesFilterService;