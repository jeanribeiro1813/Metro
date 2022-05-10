import { getCustomRepository } from 'typeorm'

import Acciones from '../../typeorm/entities/Acciones'
import AccionesRepository from '../../typeorm/repositories/AccionesRepository'

interface IRequestDTO {
    id: string;
}

class ShowAccionesService{
    public async execute ({id}:IRequestDTO): Promise<Acciones | undefined> {
        
        const accionesRepository = getCustomRepository(AccionesRepository);

        const acciones = await accionesRepository.findById(id);

        return acciones;
    }
}

export default ShowAccionesService;