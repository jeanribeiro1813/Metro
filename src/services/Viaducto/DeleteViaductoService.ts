import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import ViaductoRepository from '../../typeorm/repositories/ViaductoRepository'


interface IRequests{
    id:string;
}

class DeleteAccionesService{

    public async remove ({id}:IRequests): Promise< void > {
        
        const Repository = getCustomRepository(ViaductoRepository);

        const SSOMAPMT = await Repository.findById(id);

        if (!SSOMAPMT) {
            throw new AppError('Não Existe ',402);
          }

        await Repository.remove(SSOMAPMT);

    }
}

export default DeleteAccionesService;