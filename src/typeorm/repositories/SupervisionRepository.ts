import { Repository, EntityRepository, getRepository, Not, IsNull, ILike } from 'typeorm';

import Supervision from '../entities/Supervision';

interface ICreateSupervisionDTO {
  chave: number;
  orden:number ;
  modulacion_viaducto:string   ;
  sector:string   ;
  estructura:string   ;
  ubicacion:string   ;
  descripcion:string ;
  tipologia_cimentacion:string  ;
  nomenclatura:string  ;
  actividad:string  ;
  armadura20:boolean  ;
  ejecucion50:boolean  ;
  liberacion30: boolean;
  contratista:string  ;
  subcontratista:string  ;
  muro_guia:string  ;
  periodo:string;
  inicio_perforacion:string  ;
  fin_perforacion:string  ;
  vaciado:string  ;
  csl:string  ;
  descabezado:string   ;
  longitud:number   ;
  diametro:number  ;
  rend_perforacion:number  ;
  duracion_vaciado:number ;
  duracion_vaciado_csl:string ;
  estatus:string ;
  estatus_csl:string ;
  nota:string ;
  maquina:string  ;
  ensaio_csl:string  ;
  observaciones :string   ;
  n:string  ;
  e:string  ;
  img_1:string  ;
  img_2:string  ;
  img_3:string  ;
  img_1_obs:string  ;
  img_2_obs:string;
  img_3_obs:string  ;
  inicio_construccion:string;

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
    index(theme: string): Promise<Supervision[] | undefined>
    indexByView(view: IIndexByViewDTO, theme: string): Promise<Supervision[] | undefined>
    findById(id: string): Promise<Supervision | undefined>;
    findByNomeclatura(nomenclatura: string): Promise<Supervision []| undefined>;
    create(data: ICreateSupervisionDTO): Promise<Supervision>;
    save(supervision: Supervision): Promise<Supervision>;
    saveWithPicture(supervision: Supervision): Promise<Supervision | undefined>;
    search(supervision: Supervision): Promise<Supervision[] | undefined>;
}

@EntityRepository(Supervision)
class SupervisionRepository implements ISupervisionRepository {
    private ormRepository: Repository<Supervision>;

    public async index(theme:string): Promise<Supervision[] | undefined> {
        this.ormRepository = getRepository(Supervision);
      
        const supervision = await this.ormRepository.find({
            n: Not(IsNull()),
            actividad: ILike(`%${theme}%`),
        });
  
        return supervision;
    }

    public async indexByView({view}:IIndexByViewDTO, theme:string): Promise<Supervision[] | undefined> {
        this.ormRepository = getRepository(Supervision);
        const supervision = await this.ormRepository.manager.query(`
        SELECT *
        FROM supervision
        WHERE n is not null AND actividad ilike '%${theme}%' AND st_intersects(ST_MakeEnvelope(${view.southWestLng}, ${view.southWestLat}, ${view.northEastLng}, ${view.northEastLat}, 4326),ST_GeomFromText('POINT('||e||' '||n||')',4326)) 
        `);
    
        return supervision;
    }

    public async findById(id: string): Promise<Supervision | undefined> {
        this.ormRepository = getRepository(Supervision);
      
        const supervision = await this.ormRepository.findOne(id);
  
        return supervision;
    }

    public async findByNomeclatura(nomenclatura: string): Promise<Supervision [] | undefined> {
        this.ormRepository = getRepository(Supervision);

        const supervision = await this.ormRepository.query(
            `select * from supervision where nomenclatura ilike '${nomenclatura}';`
        );
  
        return supervision;
    }
  

    public async create({
        chave,
        orden,
        modulacion_viaducto,
        sector,
        estructura,
        ubicacion,
         descripcion,
        tipologia_cimentacion,
        nomenclatura,
        actividad,
        armadura20,
        ejecucion50,
        liberacion30,
        contratista,
        subcontratista,
        muro_guia,
        periodo,
        inicio_perforacion,
        fin_perforacion,
        vaciado,
        csl,
        descabezado,
        longitud,
        diametro,
        rend_perforacion,
        duracion_vaciado,
        duracion_vaciado_csl,
        estatus,
        estatus_csl,
        nota,
        maquina,
        ensaio_csl,
        observaciones,
        n,
        e,
        img_1,
        img_2,
        img_3,
        img_1_obs,
        img_2_obs,
        img_3_obs,
        inicio_construccion
    }: ICreateSupervisionDTO): Promise<Supervision> {
        this.ormRepository = getRepository(Supervision);
        const supervision = this.ormRepository.create({
  chave,
  orden,
  modulacion_viaducto,
  sector,
  estructura,
  ubicacion,
   descripcion,
  tipologia_cimentacion,
  nomenclatura,
  actividad,
  armadura20,
  ejecucion50,
  liberacion30,
  contratista,
  subcontratista,
  muro_guia,
  periodo,
  inicio_perforacion,
  fin_perforacion,
  vaciado,
  csl,
  descabezado,
  longitud,
  diametro,
  rend_perforacion,
  duracion_vaciado,
  duracion_vaciado_csl,
  estatus,
  estatus_csl,
  nota,
  maquina,
  ensaio_csl,
  observaciones,
  n,
  e,
  img_1,
  img_2,
  img_3,
  img_1_obs,
  img_2_obs,
  img_3_obs,
  inicio_construccion
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
