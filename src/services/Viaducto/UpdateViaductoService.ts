import { getCustomRepository } from 'typeorm'
import Viaducto from '../../typeorm/entities/Viaducto'
import ViaductoRepository from '../../typeorm/repositories/ViaductoRepository'

import AppError from '../../errors/AppError';

interface IRequestDTO {

    id:string,
    cod:string
    descripcion:string,
 
}

class UpdateViadcutoService{
    public async execute(
        {
            id,cod,
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
        result.cod = cod ? cod : result.cod;

       
        
        await Repository.save(result);

        return result;
     
    }
}


export default UpdateViadcutoService;

