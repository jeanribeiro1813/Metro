import { 
    ViewEntity,
    Column,
    PrimaryColumn,

} from "typeorm";
    
    
@ViewEntity('reportes')
class Pilote{

    @PrimaryColumn()
    id!:number

    @Column('varchar')
    fim_perfu!:string ;

    @Column()
    inicio!: string;

    @Column()
    fin!: string;

    @Column()
    proyecto!: string;

    @Column()
    actividad!: string;

    @Column()
    cliente!: string;

    @Column()
    inpeccion!: string;

    @Column()
    manha!: string;

    @Column()
    tarde!: string;

    @Column()
    noche!: string;

    @Column()
    contratista!: string;

    @Column('varchar')
    subcontra!:string   ;

    @Column('varchar')
    locali!:string   ;

    @Column()
    ensayos!: string;
    
    @Column()
    observaciones!: string;

    @Column('varchar')
    img_1:string  ;

    @Column('varchar')
    img_2:string  ;
    
    @Column('varchar')
    img_3:string;
    
    @Column('varchar')
    vazio!:string ;

    @Column('varchar')
    cls!:string  ;

    @Column('varchar')
    obs!:string   ;

}
    
export default Pilote;