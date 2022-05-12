import { getCustomRepository } from 'typeorm'
import Viaducto from '../../typeorm/entities/Viaducto'
import ViaductoRepository from '../../typeorm/repositories/ViaductoRepository'

import AppError from '../../errors/AppError';

interface IRequestDTO {

    id:string,
    codigo:string
    descripcion:string,
 
}

class UpdateViadcutoService{
    public async execute(
        {
            id,codigo,
            descripcion
   
        }:IRequestDTO
    ): Promise<Viaducto | undefined>
    {
        const Repository = getCustomRepository(ViaductoRepository);

        const result = await Repository.findById(id);

        if(!result){
            throw new AppError('acciones does not exists!'); 
        }

        result.descripcion = descripcion ? descripcion : result.descripcion;
        result.codigo = codigo ? codigo : result.codigo;

       
        
        await Repository.save(result);

        return result;
     
    }
}


export default UpdateViadcutoService;

