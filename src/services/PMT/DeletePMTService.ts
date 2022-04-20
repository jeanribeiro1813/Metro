import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import PMT from '../../typeorm/entities/PMT'
import PMTRepository from '../../typeorm/repositories/PMTRepository'


interface IRequests{
    id:string;
}

class DeletePMTService{

    public async remove ({id}:IRequests): Promise< void > {
        
        const pmtRepository = getRepository(PMT);

        const pmt = await pmtRepository.findOne(id);

        if (!pmt) {
            throw new AppError('Não Existe ',402);
          }

        await pmtRepository.remove(pmt);

    }
}

export default DeletePMTService;