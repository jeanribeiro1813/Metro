import { getCustomRepository, getRepository } from 'typeorm'

import SSOMAPMT from '../../typeorm/entities/SSOMAPMT'
import SSOMAPMTRepository from '../../typeorm/repositories/SSOMAPMTRepository'

interface IRequestDTO {
    categoria:string;
}

class LoadSSOMAPMTFilterService{
    public async filter ({categoria}:IRequestDTO): Promise<SSOMAPMT[] | undefined> {
        
        const loadService =  getRepository(SSOMAPMT);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' categoria :: text  ilike :categoria', {categoria: `%${categoria}%`}).getMany();

        return cargoRepo;
    }
}

export default LoadSSOMAPMTFilterService;