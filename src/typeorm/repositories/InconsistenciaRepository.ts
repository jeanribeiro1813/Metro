import { Repository, EntityRepository, getRepository } from 'typeorm';

import Inconsistencia from '../entities/Inconsistencia';

interface ICreateUserDTO {
    id:string ;
    descripcion:string;

}

interface IInconsistenciaRepository {
    findById(id: string): Promise<Inconsistencia | undefined>;
    create(data: ICreateUserDTO): Promise<Inconsistencia>;
    save(inconsistencia: Inconsistencia): Promise<Inconsistencia>;
    remove(inconsistencia: Inconsistencia): Promise<Inconsistencia>;

}
  
@EntityRepository(Inconsistencia)
class InconsistenciaRepository implements IInconsistenciaRepository {
    private ormRepository: Repository<Inconsistencia>;
    
    public async findById(id: string): Promise<Inconsistencia | undefined> {
        this.ormRepository = getRepository(Inconsistencia);
        const inconsistencia = await this.ormRepository.findOne(id);
        return inconsistencia;
    }
  
    public async create({
        id,
        descripcion
    }: ICreateUserDTO): Promise<Inconsistencia> {
        this.ormRepository = getRepository(Inconsistencia);

        const inconsistencia = this.ormRepository.create({
            id,
            descripcion
        });
  
        await this.ormRepository.save(inconsistencia);
  
        return inconsistencia;
    }

    public async save(inconsistencia: Inconsistencia): Promise<Inconsistencia> {
        this.ormRepository = getRepository(Inconsistencia);
        return this.ormRepository.save(inconsistencia);
    }

    public async remove(inconsistencia: Inconsistencia): Promise<Inconsistencia> {
        this.ormRepository = getRepository(Inconsistencia);
        return this.ormRepository.remove(inconsistencia);
    }
  


}

export default InconsistenciaRepository;
