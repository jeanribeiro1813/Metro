import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Acciones from '../../typeorm/entities/Acciones'
import AccionesRepository from '../../typeorm/repositories/AccionesRepository'


interface IRequests{
    id:string;
}

class DeleteAccionesService{

    public async remove ({id}:IRequests): Promise< void > {
        
        const SSOMAPMTRepository = getCustomRepository(AccionesRepository);

        const SSOMAPMT = await SSOMAPMTRepository.findById(id);

        if (!SSOMAPMT) {
            throw new AppError('Não Existe ',402);
          }

        await SSOMAPMTRepository.remove(SSOMAPMT);

    }
}

export default DeleteAccionesService;