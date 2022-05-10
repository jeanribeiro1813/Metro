import { Repository, EntityRepository, getRepository } from 'typeorm';

import Acciones from '../entities/Acciones';

interface ICreateUserDTO {
    id:string ;
    descripcion:string;

}

interface IAccionesRepository {
    findById(id: string): Promise<Acciones | undefined>;
    create(data: ICreateUserDTO): Promise<Acciones>;
    save(acciones: Acciones): Promise<Acciones>;
    remove(acciones: Acciones): Promise<Acciones>;

}
  
@EntityRepository(Acciones)
class AccionesRepository implements IAccionesRepository {
    private ormRepository: Repository<Acciones>;
    
    public async findById(id: string): Promise<Acciones | undefined> {
        this.ormRepository = getRepository(Acciones);
        const acciones = await this.ormRepository.findOne(id);
        return acciones;
    }
  
    public async create({
        id,
        descripcion
    }: ICreateUserDTO): Promise<Acciones> {
        this.ormRepository = getRepository(Acciones);

        const acciones = this.ormRepository.create({
            id,
            descripcion
        });
  
        await this.ormRepository.save(acciones);
  
        return acciones;
    }

    public async save(acciones: Acciones): Promise<Acciones> {
        this.ormRepository = getRepository(Acciones);
        return this.ormRepository.save(acciones);
    }

    public async remove(acciones: Acciones): Promise<Acciones> {
        this.ormRepository = getRepository(Acciones);
        return this.ormRepository.remove(acciones);
    }
  


}

export default AccionesRepository;
