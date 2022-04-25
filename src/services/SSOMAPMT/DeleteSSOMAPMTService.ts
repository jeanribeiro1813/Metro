import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import SSOMAPMT from '../../typeorm/entities/SSOMAPMT'


interface IRequests{
    id:string;
}

class DeleteSSOMAPMTService{

    public async remove ({id}:IRequests): Promise< void > {
        
        const ssomapmtTRepository = getRepository(SSOMAPMT);

        const SSOMA = await ssomapmtTRepository.findOne(id);

        if (!SSOMA) {
            throw new AppError('Não Existe ',402);
          }

        await ssomapmtTRepository.remove(SSOMA);

    }
}

export default DeleteSSOMAPMTService;