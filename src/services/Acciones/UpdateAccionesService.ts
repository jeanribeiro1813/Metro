import { getCustomRepository } from 'typeorm'
import Acciones from '../../typeorm/entities/Acciones'
import AccionesRepository from '../../typeorm/repositories/AccionesRepository'

import AppError from '../../errors/AppError';

interface IRequestDTO {

    id:string,
    descripcion:string,

 
}

class UpdateAccionesService{
    public async execute(
        {
            id,
            descripcion,
   
        }:IRequestDTO
    ): Promise<Acciones | undefined>
    {
        const accionesRepository = getCustomRepository(AccionesRepository);

        const acciones = await accionesRepository.findById(id);

        if(!acciones){
            throw new AppError('acciones does not exists!'); 
        }

        acciones.descripcion = descripcion ? descripcion : acciones.descripcion;
       
        
        await accionesRepository.save(acciones);

        return acciones;
     
    }
}


export default UpdateAccionesService;

