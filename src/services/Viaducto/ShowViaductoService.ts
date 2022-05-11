import { getCustomRepository } from 'typeorm'

import Viaducto from '../../typeorm/entities/Viaducto'
import ViaductoRepository from '../../typeorm/repositories/ViaductoRepository'

interface IRequestDTO {
    id: string;
}

class ShowViaductosService{
    public async execute ({id}:IRequestDTO): Promise<Viaducto | undefined> {
        
        const Repository = getCustomRepository(ViaductoRepository);

        const result = await Repository.findById(id);

        return result;
    }
}

export default ShowViaductosService;