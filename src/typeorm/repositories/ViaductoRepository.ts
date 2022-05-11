import { Repository, EntityRepository } from 'typeorm';

import Viaducto from '../entities/Viaducto';

@EntityRepository(Viaducto)
export default class PagamentoViewRepository extends Repository<Viaducto> {

    public async findType(cod: string): Promise< Viaducto | undefined > {

      const typeAvanco = this.findOne({
        where : {
          cod
        },

      });
      return typeAvanco;
}

public async findById(id: string): Promise< Viaducto | undefined > {

  const typeAvanco = this.findOne({
    where : {
      id
    },

  });
  return typeAvanco;
}

}
