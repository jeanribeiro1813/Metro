import { getCustomRepository,getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Estacion from '../../typeorm/entities/Estacion';

interface IRequestDTO {
    id: string;
}

class DeleteEstacionService{

    public async remove ({id}:IRequestDTO): Promise< void > {
        
        const SSOMAPMTRepository = getRepository(Estacion);

        const SSOMAPMT = await SSOMAPMTRepository.findOne({id});

        if (!SSOMAPMT) {
            throw new AppError('Não Existe ');
          }

        await SSOMAPMTRepository.remove(SSOMAPMT);

    }
}

export default DeleteEstacionService;