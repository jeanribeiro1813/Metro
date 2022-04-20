import { Repository, EntityRepository, getRepository, Not, IsNull } from 'typeorm';

import PMT from '../entities/PMT';

interface ICreatePMTDTO {
    id:string,
    user:string,
    atividades:string;
    inconsistencia:string;
    acciones:string;
    fecha:string,
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

interface IPMTRepository {
    index(): Promise<PMT[] | undefined>
    indexByView(view: IIndexByViewDTO): Promise<PMT[] | undefined>
    findById(id: string): Promise<PMT | undefined>;
    findAtividade(atividade: string): Promise<PMT | undefined>;
    // findByPilha(pmt: string): Promise<PMT | undefined>;
    create(data: ICreatePMTDTO): Promise<PMT>;
    save(pmt: PMT): Promise<PMT>;
    saveWithPicture(pmt: PMT): Promise<PMT | undefined>;
    // search(pmt: PMT): Promise<PMT[] | undefined>;
}

@EntityRepository(PMT)

class PMTRepository implements IPMTRepository {
    private ormRepository: Repository<PMT>;

    public async index(): Promise<PMT[] | undefined> {
        this.ormRepository = getRepository(PMT);
      
        const pmt = await this.ormRepository.find({
            n: Not(IsNull()),
        });
  
        return pmt;
    }

    public async indexByView({view}:IIndexByViewDTO): Promise<PMT[] | undefined> {
        this.ormRepository = getRepository(PMT);
        const pmt = await this.ormRepository.manager.query(`
        SELECT *
        FROM public.pmt
        WHERE n is not null AND st_intersects(ST_MakeEnvelope(${view.southWestLng}, ${view.southWestLat}, ${view.northEastLng}, ${view.northEastLat}, 4326),ST_GeomFromText('POINT('||e||' '||n||')',4326)) 
        `);
    
        return pmt;
    }

    public async findById(id: string): Promise<PMT | undefined> {
        this.ormRepository = getRepository(PMT);
      
        const pmt = await this.ormRepository.findOne(id);
  
        return pmt;
    }


    public async create({
        id,        user,
        atividades,
        inconsistencia,
        acciones,
	fecha,
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
    }: ICreatePMTDTO): Promise<PMT> {

        this.ormRepository = getRepository(PMT);

        const pmt = this.ormRepository.create({

            id,        user,
        atividades,
        inconsistencia,
        acciones,
	fecha,
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
  
        await this.ormRepository.save(pmt);
  
        return pmt;
    }
  
    public async save(pmt: PMT): Promise<PMT> {
        this.ormRepository = getRepository(PMT);
        return this.ormRepository.save(pmt);
    }

    public async saveWithPicture(pmt: PMT): Promise<PMT|undefined> {
        this.ormRepository = getRepository(PMT);
        const bugFix = JSON.stringify(pmt);
        if(!bugFix.includes("file:///")){
            return this.ormRepository.save(pmt);
        }else{
            return undefined
        }
    }

    public async findAtividade(atividade: string): Promise <PMT | undefined> {

        this.ormRepository = getRepository(PMT);

        const pmt = await this.ormRepository.findOne(atividade);
  
        return pmt;
    }

  

}

export default PMTRepository;


  // public async search(pmt: PMT): Promise<PMT[] | undefined> {
    //     this.ormRepository = getRepository(PMT);

    //     const pilotes = await this.ormRepository.find({
    //         where: pilote,
    //     });
    //   return pmt;
    // }


      // public async findByPilha(pilha: string): Promise<PMT | undefined> {
    //     this.ormRepository = getRepository(PMT);
    //     const pmt = await this.ormRepository.findOne({
    //         where: { pilha },
    //     });
    //   return pmt;
    // }
