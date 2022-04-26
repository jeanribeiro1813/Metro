import { Repository, EntityRepository, getRepository, Not, IsNull } from 'typeorm';

import ssomaPmt from '../entities/SSOMAPMT';

interface ICreateSSOMAPMTDTO {
    id:string;
    user:string;
    atividades:string;
    inconsistencia:string;
    acciones:string;
    fecha:string;
    categoria:string;
    imagen1:string;
    descrimg1:string;
    imagen2: string;
    descrimg2:string;
    imagen3:string;
    descrimg3:string;
    imagen4:string;
    descrimg4:string;
    imagen5:string;
    descrimg5:string;
    imagen6 :string;
    descrimg6: string;
    imagen7:string;
    descrimg7:string;
    imagen8:string;
    descrimg8:string;
    e:string;
    n:string;
    ubicacion:string;
}

interface IIndexByViewDTO {
    view:{
        southWestLng: number;
        southWestLat: number;
        northEastLng: number;
        northEastLat: number;
    }
}

interface ISSOMAPMTRepository {
    index(): Promise<ssomaPmt[] | undefined>
    indexByView(view: IIndexByViewDTO): Promise<ssomaPmt[] | undefined>
    findById(id: string): Promise<ssomaPmt | undefined>;
    findCategoria(categoria: string): Promise<ssomaPmt | undefined>;
    create(data: ICreateSSOMAPMTDTO): Promise<ssomaPmt>;
    save(ssomaPmt: ssomaPmt): Promise<ssomaPmt>;
    saveWithPicture(ssomaPmt: ssomaPmt): Promise<ssomaPmt | undefined>;
    search(ssomaPmt: ssomaPmt): Promise<ssomaPmt[] | undefined>;
}

@EntityRepository(ssomaPmt)

class SSOMAPMTRepository implements ISSOMAPMTRepository {
    private ormRepository: Repository<ssomaPmt>;

    public async index(): Promise<ssomaPmt[] | undefined> {
        this.ormRepository = getRepository(ssomaPmt);
      
        const dados = await this.ormRepository.find({
            n: Not(IsNull()),
        });
  
        return dados;
    }

    public async indexByView({view}:IIndexByViewDTO): Promise<ssomaPmt[] | undefined> {
        this.ormRepository = getRepository(ssomaPmt);
        const dados = await this.ormRepository.manager.query(`
        SELECT *
        FROM public.ssoma_pmt
        WHERE n is not null AND st_intersects(ST_MakeEnvelope(${view.southWestLng}, ${view.southWestLat}, ${view.northEastLng}, ${view.northEastLat}, 4326),ST_GeomFromText('POINT('||e||' '||n||')',4326)) 
        `);
    
        return dados;
    }

    public async findById(id: string): Promise<ssomaPmt | undefined> {
        this.ormRepository = getRepository(ssomaPmt);
      
        const dados = await this.ormRepository.findOne(id);
  
        return dados;
    }


    public async create({
        id,        user,
        atividades,
        inconsistencia,
        acciones,
        fecha,
        categoria,
        imagen1,
        descrimg1,
        imagen2,
        descrimg2,
        imagen3,
        descrimg3,
        imagen4,
        descrimg4,
        imagen5,
        descrimg5,
        imagen6,
        descrimg6,
        imagen7,
        descrimg7,
        imagen8,
        descrimg8,
        e,
        n,
        ubicacion
    }: ICreateSSOMAPMTDTO): Promise<ssomaPmt> {

        this.ormRepository = getRepository(ssomaPmt);

        const dados = this.ormRepository.create({

            id,        user,
        atividades,
        inconsistencia,
        acciones,
        fecha,
        categoria,
        imagen1,
        descrimg1,
        imagen2,
        descrimg2,
        imagen3,
        descrimg3,
        imagen4,
        descrimg4,
        imagen5,
        descrimg5,
        imagen6,
        descrimg6,
        imagen7,
        descrimg7,
        imagen8,
        descrimg8,
        e,
        n,
        ubicacion

        });
  
        await this.ormRepository.save(dados);
  
        return dados;
    }
  
    public async save(ssoma: ssomaPmt): Promise<ssomaPmt> {
        this.ormRepository = getRepository(ssomaPmt);
        return this.ormRepository.save(ssoma);
    }

    public async saveWithPicture(ssoma: ssomaPmt): Promise<ssomaPmt|undefined> {
        this.ormRepository = getRepository(ssomaPmt);
        const bugFix = JSON.stringify(ssomaPmt);
        if(!bugFix.includes("file:///")){
            return this.ormRepository.save(ssoma);
        }else{
            return undefined
        }
    }

    public async findCategoria(categoria: string): Promise <ssomaPmt | undefined> {

        this.ormRepository = getRepository(ssomaPmt);

        const dados = await this.ormRepository.findOne(categoria);
  
        return dados;
    }

    public async search(ssoma: ssomaPmt): Promise<ssomaPmt[] | undefined> {
        
        this.ormRepository = getRepository(ssomaPmt);

        return await this.ormRepository.find({
            where: ssoma,
        });

    }
  

}

export default SSOMAPMTRepository;


