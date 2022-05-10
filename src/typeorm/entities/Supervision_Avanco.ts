import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
    
@Entity('supervision')
class Supervision{
    
    @Column()
    avanco!:string  ;

    @Column('bigint')
    count: number;

    @Column('text')
    porcentagem:string ;

}
    
export default Supervision;