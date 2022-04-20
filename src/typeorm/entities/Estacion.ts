import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('ubicacion_estaciones_aeb')
class Estacion{

    @PrimaryGeneratedColumn('uuid')
    id!:string  ;

    @Column('varchar')
    este!:string ;

    @Column('varchar')
    norte!:string   ;

    @Column('varchar')
    estacion!:string   ;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column('varchar')
    sigla!:string   ;

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
}

export default Estacion;