import { getCustomRepository, getRepository } from 'typeorm'

import Supervision from '../../typeorm/entities/Supervision'

interface IRequestDTO {
    actividad: string;
    created_at?:string;
    updated_at?:string;
}

class LoadSupervisionFilterService{
    public async filter ({actividad}:IRequestDTO): Promise<Supervision[] | undefined> {
        
        const loadService =  getRepository(Supervision);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' actividad :: text  ilike :actividad', {actividad: `%${actividad}%`}).getMany();

        cargoRepo?.map((x) =>{
            delete x.created_at
            delete x.updated_at
        })

        
        return cargoRepo;
    }
}

export default LoadSupervisionFilterService;