import { getCustomRepository, getRepository } from 'typeorm'

import Viaducto from '../../typeorm/entities/Viaducto'

interface IRequestDTO {
    cod: string;
}

class LoadAccionesFilterService{
    public async filter ({cod}:IRequestDTO): Promise<Viaducto[] | undefined> {
        
        const loadService =  getRepository(Viaducto);

        const Repo = await loadService.createQueryBuilder().select()
        .where(' cod  ilike :cod', {cod: `%${cod}%`}).getMany();

        return Repo;
    }
}

export default LoadAccionesFilterService;