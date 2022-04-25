import { Repository, EntityRepository, getRepository, Not, IsNull } from 'typeorm';

import Supervision from '../entities/Supervision';

interface ICreateSupervisionDTO {
    ordem_serv:string,
    mod_viaduto:string,
    locali:string;
    descri:string;
    tipologia:string;
    pilha:string;
    e:string;
    n: string;
    subcontra:string;
    parede_guia:string;
    inicio_perfu:string;
    fim_perfu:string;
    vazio:string;
    cls:string;
    long_metro:string;
    diam:string;
    rend_metro_dia: string;
    status:string;
    maquina:string;
    ensaio_csl:string;
    obs:string;
    img_1:string;
    img_2:string;
    img_3:string;
    actividad:string;
}

interface IIndexByViewDTO {
    view:{
        southWestLng: number;
        southWestLat: number;
        northEastLng: number;
        northEastLat: number;
    }
}

interface ISupervisionRepository {
    index(): Promise<Supervision[] | undefined>
    indexByView(view: IIndexByViewDTO): Promise<Supervision[] | undefined>
    findById(id: string): Promise<Supervision | undefined>;
    // findBySupervision(supervision: string): Promise<Supervision | undefined>;
    create(data: ICreateSupervisionDTO): Promise<Supervision>;
    save(supervision: Supervision): Promise<Supervision>;
    saveWithPicture(supervision: Supervision): Promise<Supervision | undefined>;
    search(supervision: Supervision): Promise<Supervision[] | undefined>;
}

@EntityRepository(Supervision)
class SupervisionRepository implements ISupervisionRepository {
    private ormRepository: Repository<Supervision>;

    public async index(): Promise<Supervision[] | undefined> {
        this.ormRepository = getRepository(Supervision);
      
        const supervision = await this.ormRepository.find({
            n: Not(IsNull()),
        });
  
        return supervision;
    }

    public async indexByView({view}:IIndexByViewDTO): Promise<Supervision[] | undefined> {
        this.ormRepository = getRepository(Supervision);
        const supervision = await this.ormRepository.manager.query(`
        SELECT *
        FROM prod.supervision
        WHERE n is not null AND st_intersects(ST_MakeEnvelope(${view.southWestLng}, ${view.southWestLat}, ${view.northEastLng}, ${view.northEastLat}, 4326),ST_GeomFromText('POINT('||e||' '||n||')',4326)) 
        `);
    
        return supervision;
    }

    public async findById(id: string): Promise<Supervision | undefined> {
        this.ormRepository = getRepository(Supervision);
      
        const supervision = await this.ormRepository.findOne(id);
  
        return supervision;
    }

    public async findByPilha(id: string): Promise<Supervision | undefined> {
        this.ormRepository = getRepository(Supervision);
      
        const supervision = await this.ormRepository.findOne(id);
  
        return supervision;
    }
  

    public async create({
        ordem_serv,
        mod_viaduto,
        locali,
        descri,
        tipologia,
        pilha,
        e,
        n,
        subcontra,
        parede_guia,
        inicio_perfu,
        fim_perfu,
        vazio,
        cls,
        long_metro,
        diam,
        rend_metro_dia,
        status,
        maquina,
        ensaio_csl,
        obs,
        img_1,
        img_2,
        img_3,
        actividad
    }: ICreateSupervisionDTO): Promise<Supervision> {
        this.ormRepository = getRepository(Supervision);
        const supervision = this.ormRepository.create({
            ordem_serv,
            mod_viaduto,
            locali,
            descri,
            tipologia,
            pilha,
            e,
            n,
            subcontra,
            parede_guia,
            inicio_perfu,
            fim_perfu,
            vazio,
            cls,
            long_metro,
            diam,
            rend_metro_dia,
            status,
            maquina,
            ensaio_csl,
            obs,
            img_1,
            img_2,
            img_3,
            actividad
        });
  
        await this.ormRepository.save(supervision);
  
        return supervision;
    }
  
    public async save(supervision: Supervision): Promise<Supervision> {
        this.ormRepository = getRepository(Supervision);
        return this.ormRepository.save(supervision);
    }

    public async saveWithPicture(supervision: Supervision): Promise<Supervision|undefined> {
        this.ormRepository = getRepository(Supervision);
        const bugFix = JSON.stringify(supervision);
        if(!bugFix.includes("file:///")){
            return this.ormRepository.save(supervision);
        }else{
            return undefined
        }
    }

    public async search(supervision: Supervision): Promise<Supervision[] | undefined> {
        this.ormRepository = getRepository(Supervision);

        const supervi = await this.ormRepository.find({
            where: supervision,
        });
      return supervi;
    }

}

export default SupervisionRepository;
