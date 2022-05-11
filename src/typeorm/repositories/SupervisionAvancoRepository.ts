import { Repository, EntityRepository } from 'typeorm';

import Supervision_Avanco from '../entities/Supervision_Avanco';

@EntityRepository(Supervision_Avanco)
export default class PagamentoViewRepository extends Repository<Supervision_Avanco> {

    public async findType(actividad: string): Promise< Supervision_Avanco | undefined > {

      const typeAvanco = this.findOne({
        where : {
          actividad
        },

      });
      return typeAvanco;
}

}
