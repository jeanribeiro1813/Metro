import { Repository, EntityRepository, getRepository, Not, IsNull } from 'typeorm';

import Ubicacion from '../entities/Ubicacion';

interface ICreateUbicacionDTO {
    este:string;
    norte:string;
    ubicacion:string;
    sigla:string;
}

interface IIndexByViewDTO {
    view:{
        southWestLng: number;
        southWestLat: number;
        northEastLng: number;
        northEastLat: number;
    }
}

interface IUbicacionesRepository {
    index(): Promise<Ubicacion[] | undefined>
    indexByView(view: IIndexByViewDTO): Promise<Ubicacion[] | undefined>
    findById(id: string): Promise<Ubicacion | undefined>;
    findByUbicacion(ubicacion: string): Promise<Ubicacion | undefined>;
    create(data: ICreateUbicacionDTO): Promise<Ubicacion>;
    save(ubicacion: Ubicacion): Promise<Ubicacion>;
    search(ubicacion: Ubicacion): Promise<Ubicacion[] | undefined>;
    remove(ubicacion: Ubicacion): Promise<Ubicacion>;

}

@EntityRepository(Ubicacion)
class UbicacionesRepository implements IUbicacionesRepository {
    private ormRepository: Repository<Ubicacion>;

    public async index(): Promise<Ubicacion[] | undefined> {
        this.ormRepository = getRepository(Ubicacion);
      
        const ubicaciones = await this.ormRepository.find({
            norte: Not(IsNull()),
        });
    
        return ubicaciones;
    }

    public async indexByView({view}:IIndexByViewDTO): Promise<Ubicacion[] | undefined> {
        this.ormRepository = getRepository(Ubicacion);
        const ubicaciones = await this.ormRepository.manager.query(`
        SELECT *
        FROM prod.ubicacion_estaciones_aeb
        WHERE norte is not null AND st_intersects(ST_MakeEnvelope(${view.southWestLng}, ${view.southWestLat}, ${view.northEastLng}, ${view.northEastLat}, 4326),ST_GeomFromText('POINT('||este||' '||norte||')',4326)) 
        `);  
    
        return ubicaciones;
    }

    public async findById(id: string): Promise<Ubicacion | undefined> {
        this.ormRepository = getRepository(Ubicacion);
      
        const ubicacion = await this.ormRepository.findOne(id);
  
        return ubicacion;
    }

    public async findByUbicacion(ubicacion: string): Promise<Ubicacion | undefined> {
        this.ormRepository = getRepository(Ubicacion);
        const storagedUbicacion = await this.ormRepository.findOne({
            where: { ubicacion },
        });
      return storagedUbicacion;
    }
  
    public async create({
        este,
        norte,
        ubicacion,
        sigla
    }: ICreateUbicacionDTO): Promise<Ubicacion> {
        this.ormRepository = getRepository(Ubicacion);
        const newUbicacion = this.ormRepository.create({
            este,
            norte,
            ubicacion,
            sigla
        });
  
        await this.ormRepository.save(newUbicacion);
  
        return newUbicacion;
    }
  
    public async save(ubicacion: Ubicacion): Promise<Ubicacion> {
        this.ormRepository = getRepository(Ubicacion);
        return this.ormRepository.save(ubicacion);
    }

    public async search(ubicacion: Ubicacion): Promise<Ubicacion[] | undefined> {
        this.ormRepository = getRepository(Ubicacion);

        const ubicaciones = await this.ormRepository.find({
            where: ubicacion,
        });
      return ubicaciones;
    }

    public async remove(ubicacion: Ubicacion): Promise<Ubicacion> {
        this.ormRepository = getRepository(Ubicacion);
        return this.ormRepository.remove(ubicacion);
    }
  

}

export default UbicacionesRepository;
