import { getCustomRepository } from 'typeorm'

import SSOMAPMT from '../../typeorm/entities/SSOMAPMT'
import SSOMAPMTRepository from '../../typeorm/repositories/SSOMAPMTRepository'

interface IRequestDTO {
    id: string;
}

class ShowSSOMAPMTService{
    public async execute ({id}:IRequestDTO): Promise<SSOMAPMT | undefined> {
        
        const ssomapmtRepository = getCustomRepository(SSOMAPMTRepository);

        const SSOMAPMT = await ssomapmtRepository.findById(id);

        return SSOMAPMT;
    }
}

export default ShowSSOMAPMTService;