import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
    
@Entity('viaducto')
class Supervision{

    @PrimaryGeneratedColumn('uuid')
    id!:string  ;
    
    @Column()
    cod: string;
    
    @Column()
    descripcion!:string  ;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date; 

}
    
export default Supervision;