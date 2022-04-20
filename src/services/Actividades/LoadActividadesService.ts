import { getCustomRepository, getRepository } from 'typeorm';

import Actividades from '../../typeorm/entities/Actividades'
import ActividadesRepository from '../../typeorm/repositories/ActividadesRepository'



class LoadActividadesService{

    public async execute (): Promise< Actividades[] | undefined> {
        
        const acitividadesRepository = getRepository(Actividades);

        const actividades = await acitividadesRepository.find({});
      

        return actividades;
    }
}

export default LoadActividadesService;