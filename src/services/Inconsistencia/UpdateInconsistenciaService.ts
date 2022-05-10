import { getCustomRepository } from 'typeorm'
import Inconsistencia from '../../typeorm/entities/Inconsistencia'
import InconsistenciaRepository from '../../typeorm/repositories/InconsistenciaRepository'

import AppError from '../../errors/AppError';

interface IRequestDTO {

    id:string,
    descripcion:string,

 
}

class UpdateInconsistenciaService{
    public async execute(
        {
            id,
            descripcion,
   
        }:IRequestDTO
    ): Promise<Inconsistencia | undefined>
    {
        const inconsistenciaRepository = getCustomRepository(InconsistenciaRepository);

        const inconsistencia = await inconsistenciaRepository.findById(id);

        if(!inconsistencia){
            throw new AppError('inconsistencia does not exists!'); 
        }

        inconsistencia.descripcion = descripcion ? descripcion : inconsistencia.descripcion;
       
        
        await inconsistenciaRepository.save(inconsistencia);

        return inconsistencia;
     
    }
}


export default UpdateInconsistenciaService;

