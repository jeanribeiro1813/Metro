import { Repository, EntityRepository } from 'typeorm';

import Reportes_Pilote from '../entities/Reportes_Pilote';

@EntityRepository(Reportes_Pilote)
export default class Reportes_PiloteRepository extends Repository<Reportes_Pilote> {
  public async findById(id: string): Promise<Reportes_Pilote | undefined> {

    const projeto = this.findOne({
      where: {
        id
      },

    });
    return projeto;
  }


}
