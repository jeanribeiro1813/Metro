import { getCustomRepository } from 'typeorm'
import Actividades from '../../typeorm/entities/Actividades'
import ActividadesRepository from '../../typeorm/repositories/ActividadesRepository'

import AppError from '../../errors/AppError';

interface IRequestDTO {

    id:string,
    descripcion:string,

 
}

class UpdateActividadesService{
    public async execute(
        {
            id,
            descripcion,
   
        }:IRequestDTO
    ): Promise<Actividades | undefined>
    {
        const actividadesRepository = getCustomRepository(ActividadesRepository);

        const actividades = await actividadesRepository.findById(id);

        if(!actividades){
            throw new AppError('actividades does not exists!'); 
        }

        actividades.descripcion = descripcion ? descripcion : actividades.descripcion;
       
        
        await actividadesRepository.save(actividades);

        return actividades;
     
    }
}


export default UpdateActividadesService;

