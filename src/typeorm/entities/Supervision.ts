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

    @Column('varchar')
    ordem_serv:string ;

    @Column('varchar')
    mod_viaduto:string   ;

    @Column('varchar')
    locali:string   ;

    @Column('varchar')
    descri:string ;

    @Column('varchar')
    tipologia:string  ;

    @Column('varchar')
    pilha:string   ;

    @Column('varchar')
    e:string   ;

    @Column('varchar')
    n:string  ;

    @Column('varchar')
    subcontra:string  ;

    @Column('varchar')
    parede_guia:string ;

    @Column('varchar')
    inicio_perfu:string ;

    @Column('varchar')
    fim_perfu:string ;

    @Column('varchar')
    vazio:string ;

    @Column('varchar')
    cls:string ;

    @Column('varchar')
    long_metro:string  ;

    @Column('varchar')
    diam:string  ;

    @Column('varchar')
    rend_metro_dia :string   ;

    @Column('varchar')
    status:string  ;

    @Column('varchar')
    maquina:string  ;

    @Column('varchar')
    ensaio_csl:string  ;

    @Column('varchar')
    obs:string  ;

    @Column('varchar')
    img_1:string  ;

    @Column('varchar')
    img_2:string  ;
    
    @Column('varchar')
    img_3:string;
    
    @Column('varchar')
    img_1_obs:string  ;

    @Column('varchar')
    img_2_obs:string  ;
    
    @Column('varchar')
    img_3_obs:string;

    @Column('varchar')
    actividad:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 


}
    
export default Supervision;