import { getCustomRepository, getRepository } from 'typeorm';

import Viaducto from '../../typeorm/entities/Viaducto'
import ViaductoRepository from '../../typeorm/repositories/ViaductoRepository'



class LoadViaductoService{

    public async execute (): Promise< Viaducto[] | undefined> {
        
        const Repository = getRepository(Viaducto);

        const viaducto = await Repository.find({});
      

        return viaducto;
    }
}

export default LoadViaductoService;