import { getCustomRepository, getRepository } from 'typeorm'

import Viaducto from '../../typeorm/entities/Viaducto'

interface IRequestDTO {
    codigo: string;
}

class LoadAccionesFilterService{
    public async filter ({codigo}:IRequestDTO): Promise<Viaducto[] | undefined> {
        
        const loadService =  getRepository(Viaducto);

        const Repo = await loadService.createQueryBuilder().select()
        .where(' codigo  ilike :codigo', {codigo: `%${codigo}%`}).getMany();

        return Repo;
    }
}

export default LoadAccionesFilterService;