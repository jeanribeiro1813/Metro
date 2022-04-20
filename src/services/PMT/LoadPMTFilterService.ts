import { getCustomRepository, getRepository } from 'typeorm'

import PMT from '../../typeorm/entities/PMT'
import PMTRepository from '../../typeorm/repositories/PMTRepository'

interface IRequestDTO {
    atividades: string;
}

class LoadPMTFilterService{
    public async filter ({atividades}:IRequestDTO): Promise<PMT[] | undefined> {
        
        const loadService =  getRepository(PMT);

        const cargoRepo = await loadService.createQueryBuilder().select()
        .where(' atividades :: text  ilike :atividades', {atividades: `%${atividades}%`}).getMany();

        return cargoRepo;
    }
}

export default LoadPMTFilterService;