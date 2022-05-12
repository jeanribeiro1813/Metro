import { 
    ViewEntity,
    Column,
    PrimaryColumn,

} from "typeorm";
    
    
@ViewEntity('supervision_reporte')
class Supervision{

    @PrimaryColumn()
    id!:number

    @Column('varchar')
    proyecto!:string ;

    @Column()
    actividad!: string;

    @Column()
    cliente!: string;

    @Column()
    inpeccion!: string;

    @Column()
    contratista!: string;

    @Column()
    subcontra!: string;

    @Column()
    locali!: string;

    @Column()
    ensayos!: string;

    @Column()
    observaciones!: string;

    @Column()
    img_1!: string;

    @Column()
    img_1_obs!: string;

    @Column('varchar')
    img_2!:string   ;

    @Column('varchar')
    img_2_obs!:string   ;

    @Column()
    img_3!: string;
    
    @Column()
    img_3_obs!: string;

    @Column('varchar')
    periodo:string  ;

    @Column('date')
    inicio:string  ;

    @Column('date')
    fin:string  ;

    @Column('varchar')
    inicio_perforacion:string  ;

    @Column('varchar')
    fin_perforacion:string  ;

    @Column('varchar')
    inicio_construccion:string  ;
    
    @Column('varchar')
    vaciado:string;

    @Column('varchar')
    csl:string  ;
    
    @Column('varchar')
    obs!:string ;

}
    
export default Supervision;