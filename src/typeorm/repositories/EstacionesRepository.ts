import { Repository, EntityRepository, getRepository, Not, IsNull } from 'typeorm';

import Estacion from '../entities/Estacion';

interface ICreateEstacionDTO {
    este:string;
    norte:string;
    estacion:string;
}

interface IIndexByViewDTO {
    view:{
        southWestLng: number;
        southWestLat: number;
        northEastLng: number;
        northEastLat: number;
    }
}

interface IEstacionesRepository {
    index(): Promise<Estacion[] | undefined>
    indexByView(view: IIndexByViewDTO): Promise<Estacion[] | undefined>
    findById(id: string): Promise<Estacion | undefined>;
    findByEstacion(estacion: string): Promise<Estacion | undefined>;
    create(data: ICreateEstacionDTO): Promise<Estacion>;
    save(estacion: Estacion): Promise<Estacion>;
    search(estacion: Estacion): Promise<Estacion[] | undefined>;
    remove(estacion: Estacion): Promise<Estacion>;

}

@EntityRepository(Estacion)
class EstacionesRepository implements IEstacionesRepository {
    private ormRepository: Repository<Estacion>;

    public async index(): Promise<Estacion[] | undefined> {
        this.ormRepository = getRepository(Estacion);
      
        const estaciones = await this.ormRepository.find({
            norte: Not(IsNull()),
        });
    
        return estaciones;
    }

    public async indexByView({view}:IIndexByViewDTO): Promise<Estacion[] | undefined> {
        this.ormRepository = getRepository(Estacion);
        const estaciones = await this.ormRepository.manager.query(`
        SELECT *
        FROM prod.ubicacion_estaciones_aeb
        WHERE norte is not null AND st_intersects(ST_MakeEnvelope(${view.southWestLng}, ${view.southWestLat}, ${view.northEastLng}, ${view.northEastLat}, 4326),ST_GeomFromText('POINT('||este||' '||norte||')',4326)) 
        `);  
    
        return estaciones;
    }

    public async findById(id: string): Promise<Estacion | undefined> {
        this.ormRepository = getRepository(Estacion);
      
        const estacion = await this.ormRepository.findOne(id);
  
        return estacion;
    }

    public async findByEstacion(estacion: string): Promise<Estacion | undefined> {
        this.ormRepository = getRepository(Estacion);
        const storagedEstacion = await this.ormRepository.findOne({
            where: { estacion },
        });
      return storagedEstacion;
    }
  
    public async create({
        este,
        norte,
        estacion
    }: ICreateEstacionDTO): Promise<Estacion> {
        this.ormRepository = getRepository(Estacion);
        const newEstacion = this.ormRepository.create({
            este,
            norte,
            estacion
        });
  
        await this.ormRepository.save(newEstacion);
  
        return newEstacion;
    }
  
    public async save(estacion: Estacion): Promise<Estacion> {
        this.ormRepository = getRepository(Estacion);
        return this.ormRepository.save(estacion);
    }

    public async search(estacion: Estacion): Promise<Estacion[] | undefined> {
        this.ormRepository = getRepository(Estacion);

        const estaciones = await this.ormRepository.find({
            where: estacion,
        });
      return estaciones;
    }

    public async remove(estacion: Estacion): Promise<Estacion> {
        this.ormRepository = getRepository(Estacion);
        return this.ormRepository.remove(estacion);
    }
  

}

export default EstacionesRepository;
