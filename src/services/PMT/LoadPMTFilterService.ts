import { getCustomRepository, getRepository } from 'typeorm'

import PMT from '../../typeorm/entities/PMT'
import PMTRepository from '../../typeorm/repositories/PMTRepository'

interface IRequestDTO {
    categoria:string;
}

class LoadPMTFilterService{
    public async filter ({categoria}:IRequestDTO): Promise<PMT[] | undefined> {
        
        const loadService =  getRepository(PMT);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' categoria :: text  ilike :categoria', {categoria: `%${categoria}%`}).getMany();

        return cargoRepo;
    }
}

export default LoadPMTFilterService;