import { getCustomRepository,getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Ubicacion from '../../typeorm/entities/Ubicacion';

interface IRequestDTO {
    id: string;
}

class DeleteUbicacionService{

    public async remove ({id}:IRequestDTO): Promise< void > {
        
        const SSOMAPMTRepository = getRepository(Ubicacion);

        const SSOMAPMT = await SSOMAPMTRepository.findOne({id});

        if (!SSOMAPMT) {
            throw new AppError('Não Existe ');
          }

        await SSOMAPMTRepository.remove(SSOMAPMT);

    }
}

export default DeleteUbicacionService;