import { getCustomRepository } from 'typeorm'
import AppError from '../../errors/AppError';

import Estacion from '../../typeorm/entities/Estacion'
import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository'

interface IRequestDTO {
    id: string;
}

class DeleteEstacionService{
    public async remove ({id}:IRequestDTO): Promise<void> {
        
        const estacionesRepository = getCustomRepository(EstacionesRepository);

        const estacion = await estacionesRepository.findById(id);

        if(!estacion){
            throw new AppError("Estaciones não existe")
        }

        await estacionesRepository.remove(estacion);

    }
}

export default DeleteEstacionService;