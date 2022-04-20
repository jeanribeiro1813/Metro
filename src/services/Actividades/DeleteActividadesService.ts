import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import ActividadesRepository from '../../typeorm/repositories/ActividadesRepository'


interface IRequests{
    id:string;
}

class DeleteActividadesService{

    public async remove ({id}:IRequests): Promise< void > {
        
        const actividadesRepository = getCustomRepository(ActividadesRepository);

        const actividades = await actividadesRepository.findById(id);

        if (!actividades) {
            throw new AppError('Não Existe ',402);
          }

        await actividadesRepository.remove(actividades);

    }
}

export default DeleteActividadesService;