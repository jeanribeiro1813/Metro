import { Repository, EntityRepository } from 'typeorm';

import Viaducto from '../entities/Viaducto';

@EntityRepository(Viaducto)
export default class PagamentoViewRepository extends Repository<Viaducto> {

    public async findType(codigo: string): Promise< Viaducto | undefined > {

      const typeAvanco = this.findOne({
        where : {
          codigo
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
