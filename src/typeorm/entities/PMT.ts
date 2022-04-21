import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
    
@Entity('pmt')
class PMT{
    
    @PrimaryGeneratedColumn('uuid')
    id!:string  ;

    @Column('varchar')
    user:string ;

    @Column('varchar')
    ubicacion:string  ;

    @Column('varchar')
    e:string  ;

    @Column('varchar')
    n:string  ;

    @Column()
    fecha:string;

    @Column('varchar')
    atividades:string   ;

    @Column('varchar')
    inconsistencia:string   ;

    @Column('varchar')
    acciones:string ;

    @Column('varchar')
    categoria:string;

    @Column('varchar')
    imagen1:string  ;

    @Column('varchar')
    descrimg1:string   ;

    @Column('varchar')
    imagen2:string   ;

    @Column('varchar')
    descrimg2:string  ;

    @Column('varchar')
    imagen3:string  ;

    @Column('varchar')
    descrimg3:string ;

    @Column('varchar')
    imagen4:string ;

    @Column('varchar')
    descrimg4:string ;

    @Column('varchar')
    imagen5:string ;

    @Column('varchar')
    descrimg5:string ;

    @Column('varchar')
    imagen6:string  ;

    @Column('varchar')
    descrimg6:string  ;

    @Column('varchar')
    imagen7 :string   ;

    @Column('varchar')
    descrimg7:string  ;

    @Column('varchar')
    imagen8:string  ;

    @Column('varchar')
    descrimg8:string  ;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 

    

}
    
export default PMT;