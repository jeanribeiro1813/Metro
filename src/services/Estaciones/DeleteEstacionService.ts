import { getCustomRepository,getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import Estacion from '../../typeorm/entities/Estacion';

interface IRequestDTO {
    id: string;
}

class DeleteEstacionService{

    public async remove ({id}:IRequestDTO): Promise< void > {
        
        const pmtRepository = getRepository(Estacion);

        const pmt = await pmtRepository.findOne({id});

        if (!pmt) {
            throw new AppError('Não Existe ');
          }

        await pmtRepository.remove(pmt);

    }
}

export default DeleteEstacionService;