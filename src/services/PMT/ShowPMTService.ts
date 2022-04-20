import { getCustomRepository } from 'typeorm'

import PMT from '../../typeorm/entities/PMT'
import PMTRepository from '../../typeorm/repositories/PMTRepository'

interface IRequestDTO {
    id: string;
}

class ShowPMTService{
    public async execute ({id}:IRequestDTO): Promise<PMT | undefined> {
        
        const pmtRepository = getCustomRepository(PMTRepository);

        const pmt = await pmtRepository.findById(id);

        return pmt;
    }
}

export default ShowPMTService;