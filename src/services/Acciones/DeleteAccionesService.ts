import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Acciones from '../../typeorm/entities/Acciones'
import AccionesRepository from '../../typeorm/repositories/AccionesRepository'


interface IRequests{
    id:string;
}

class DeleteAccionesService{

    public async remove ({id}:IRequests): Promise< void > {
        
        const pmtRepository = getCustomRepository(AccionesRepository);

        const pmt = await pmtRepository.findById(id);

        if (!pmt) {
            throw new AppError('Não Existe ',402);
          }

        await pmtRepository.remove(pmt);

    }
}

export default DeleteAccionesService;