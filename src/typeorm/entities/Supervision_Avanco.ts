import { 
    ViewEntity,
    Column,
} from "typeorm";
    
@ViewEntity('supervision_avanco')
class Supervision{
    
    @Column()
    actividad: string;
    
    @Column()
    avanco!:string  ;

    @Column('bigint')
    count: number;

    @Column('text')
    porcentagem:string ;

}
    
export default Supervision;