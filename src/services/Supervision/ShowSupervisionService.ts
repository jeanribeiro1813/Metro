import { getCustomRepository } from 'typeorm'

import Supervision from '../../typeorm/entities/Supervision'
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'

interface IRequestDTO {
    id: string;
}

class ShowSupervisionService{
    public async execute ({id}:IRequestDTO): Promise<Supervision | undefined> {
        
        const supervisionRepository = getCustomRepository(SupervisionRepository);

        const supervision = await supervisionRepository.findById(id);

        return supervision;
    }
}

export default ShowSupervisionService;