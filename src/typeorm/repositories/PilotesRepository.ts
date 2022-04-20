import { Repository, EntityRepository, getRepository, Not, IsNull } from 'typeorm';

import Pilote from '../entities/Pilote';

interface ICreatePiloteDTO {
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

interface IPilotesRepository {
    index(): Promise<Pilote[] | undefined>
    indexByView(view: IIndexByViewDTO): Promise<Pilote[] | undefined>
    findById(id: string): Promise<Pilote | undefined>;
    findByPilha(pilha: string): Promise<Pilote | undefined>;
    create(data: ICreatePiloteDTO): Promise<Pilote>;
    save(pilote: Pilote): Promise<Pilote>;
    saveWithPicture(pilote: Pilote): Promise<Pilote | undefined>;
    search(pilote: Pilote): Promise<Pilote[] | undefined>;
}

@EntityRepository(Pilote)
class PilotesRepository implements IPilotesRepository {
    private ormRepository: Repository<Pilote>;

    public async index(): Promise<Pilote[] | undefined> {
        this.ormRepository = getRepository(Pilote);
      
        const pilotes = await this.ormRepository.find({
            n: Not(IsNull()),
        });
  
        return pilotes;
    }

    public async indexByView({view}:IIndexByViewDTO): Promise<Pilote[] | undefined> {
        this.ormRepository = getRepository(Pilote);
        const pilotes = await this.ormRepository.manager.query(`
        SELECT *
        FROM prod.controle_pilha
        WHERE n is not null AND st_intersects(ST_MakeEnvelope(${view.southWestLng}, ${view.southWestLat}, ${view.northEastLng}, ${view.northEastLat}, 4326),ST_GeomFromText('POINT('||e||' '||n||')',4326)) 
        `);
    
        return pilotes;
    }

    public async findById(id: string): Promise<Pilote | undefined> {
        this.ormRepository = getRepository(Pilote);
      
        const pilote = await this.ormRepository.findOne(id);
  
        return pilote;
    }
  
    public async findByPilha(pilha: string): Promise<Pilote | undefined> {
        this.ormRepository = getRepository(Pilote);
        const pilote = await this.ormRepository.findOne({
            where: { pilha },
        });
      return pilote;
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
    }: ICreatePiloteDTO): Promise<Pilote> {
        this.ormRepository = getRepository(Pilote);
        const pilote = this.ormRepository.create({
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
  
        await this.ormRepository.save(pilote);
  
        return pilote;
    }
  
    public async save(pilote: Pilote): Promise<Pilote> {
        this.ormRepository = getRepository(Pilote);
        return this.ormRepository.save(pilote);
    }

    public async saveWithPicture(pilote: Pilote): Promise<Pilote|undefined> {
        this.ormRepository = getRepository(Pilote);
        const bugFix = JSON.stringify(pilote);
        if(!bugFix.includes("file:///")){
            return this.ormRepository.save(pilote);
        }else{
            return undefined
        }
    }

    public async search(pilote: Pilote): Promise<Pilote[] | undefined> {
        this.ormRepository = getRepository(Pilote);

        const pilotes = await this.ormRepository.find({
            where: pilote,
        });
      return pilotes;
    }

}

export default PilotesRepository;
