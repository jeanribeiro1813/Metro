import { Repository, EntityRepository } from 'typeorm';

import Supervision_Ejecutado from '../entities/Supervision_Ejecutado';

@EntityRepository(Supervision_Ejecutado)
export default class Supervision_EjecutadoViewRepository extends Repository<Supervision_Ejecutado> {

    public async findType(descripcion: string): Promise< Supervision_Ejecutado | undefined > {

      const typeEjeculado = this.findOne({
        where : {
          descripcion
        },

      });
      return typeEjeculado;
}

}
