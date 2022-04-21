import { getCustomRepository,getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Estacion from '../../typeorm/entities/Estacion';
import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository'

interface IRequestDTO {
    id: string;
}

class DeleteEstacionService{

    public async remove ({id}:IRequestDTO): Promise< void > {
        
        const pmtRepository = getRepository(Estacion);

        const pmt = await pmtRepository.findOne(id);

        if (!pmt) {
            throw new AppError('Não Existe ',402);
          }

        await pmtRepository.remove(pmt);

    }
}

export default DeleteEstacionService;