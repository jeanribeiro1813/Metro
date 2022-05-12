import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
    
@Entity('supervision')
class Supervision{
    
    @PrimaryGeneratedColumn('uuid')
    id!:string  ;

    @Column()
    chave: number;

    @Column()
    orden:number ;

    @Column('varchar')
    modulacion_viaducto:string   ;

    @Column('varchar')
    sector:string   ;

    @Column('varchar')
    estructura:string   ;

    @Column('varchar')
    ubicacion:string   ;

    @Column('varchar')
    descripcion:string ;

    @Column('varchar')
    tipologia_cimentacion:string  ;

    @Column('varchar')
    nomenclatura:string  ;

    @Column('varchar')
    actividad:string  ;

    @Column()
    armadura20:boolean  ;
    
    @Column()
    ejecucion50:boolean  ;

    @Column()
    liberacion30: boolean;

    @Column()
    contratista:string  ;
    
    @Column('varchar')
    subcontratista:string  ;

    @Column('varchar')
    muro_guia:string  ;

    @Column('varchar')
    periodo:string  ;
    
    @Column()
    inicio_perforacion:string  ;

    @Column()
    inicio_construccion:string;

    @Column()
    fin_perforacion:string  ;
    
    @Column()
    vaciado:string  ;

    @Column()
    csl:string  ;

    @Column('varchar')
    descabezado:string   ;

    @Column()
    longitud:number   ;

    @Column()
    diametro:number  ;

    @Column()
    rend_perforacion:number  ;

    @Column()
    duracion_vaciado:number ;

    @Column('varchar')
    duracion_vaciado_csl:string ;

    @Column('varchar')
    estatus:string ;

    @Column('varchar')
    estatus_csl:string ;

    @Column('varchar')
    nota:string ;

    @Column('varchar')
    maquina:string  ;

    @Column('varchar')
    ensaio_csl:string  ;

    @Column('varchar')
    observaciones :string   ;

    @Column('varchar')
    n:string  ;

    @Column('varchar')
    e:string  ;

    @Column('varchar')
    img_1:string  ;

    @Column('varchar')
    img_2:string  ;

    @Column('varchar')
    img_3:string  ;

    @Column('varchar')
    img_1_obs:string  ;
    
    @Column('varchar')
    img_2_obs:string;
    
    @Column('varchar')
    img_3_obs:string  ;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date; 

  


}
    
export default Supervision;