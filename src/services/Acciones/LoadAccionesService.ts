import { getCustomRepository, getRepository } from 'typeorm';

import Acciones from '../../typeorm/entities/Acciones'
import AccionesRepository from '../../typeorm/repositories/AccionesRepository'



class LoadAccionesService{

    public async execute (): Promise< Acciones[] | undefined> {
        
        const accionesRepository = getRepository(Acciones);

        const acciones = await accionesRepository.find({});
      

        return acciones;
    }
}

export default LoadAccionesService;