import { Repository, EntityRepository, getRepository } from 'typeorm';

import Actividades from '../entities/Actividades';

interface ICreateUserDTO {
    id:string ;
    descripcion:string;

}

interface IActividadesRepository {
    findById(id: string): Promise<Actividades | undefined>;
    create(data: ICreateUserDTO): Promise<Actividades>;
    save(actividades: Actividades): Promise<Actividades>;
    remove(actividades: Actividades): Promise<Actividades>;

}
  
@EntityRepository(Actividades)
class ActividadesRepository implements IActividadesRepository {
    private ormRepository: Repository<Actividades>;
    
    public async findById(id: string): Promise<Actividades | undefined> {
        this.ormRepository = getRepository(Actividades);
        const acciones = await this.ormRepository.findOne(id);
        return acciones;
    }
  
    public async create({
        id,
        descripcion
    }: ICreateUserDTO): Promise<Actividades> {
        this.ormRepository = getRepository(Actividades);

        const actividades = this.ormRepository.create({
            id,
            descripcion
        });
  
        await this.ormRepository.save(actividades);
  
        return actividades;
    }

    public async save(actividades: Actividades): Promise<Actividades> {
        this.ormRepository = getRepository(Actividades);
        return this.ormRepository.save(actividades);
    }

    public async remove(actividades: Actividades): Promise<Actividades> {
        this.ormRepository = getRepository(Actividades);
        return this.ormRepository.remove(actividades);
    }
  


}

export default ActividadesRepository;
