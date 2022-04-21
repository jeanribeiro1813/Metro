import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository'

interface IRequestDTO {
    id: string;
}

class DeleteEstacionService{

    public async remove ({id}:IRequestDTO): Promise< void > {
        
        const pmtRepository = getCustomRepository(EstacionesRepository);

        const pmt = await pmtRepository.findById(id);

        if (!pmt) {
            throw new AppError('Não Existe ',402);
          }

        await pmtRepository.remove(pmt);

    }
}

export default DeleteEstacionService;