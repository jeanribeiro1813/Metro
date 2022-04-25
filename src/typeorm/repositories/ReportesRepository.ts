import { Repository, EntityRepository } from 'typeorm';

import Reportes from '../entities/Reportes';

@EntityRepository(Reportes)
export default class ReportesRepository extends Repository<Reportes> {
  public async findById(id: string): Promise<Reportes | undefined> {

    const projeto = this.findOne({
      where: {
        id
      },

    });
    return projeto;
  }


}
