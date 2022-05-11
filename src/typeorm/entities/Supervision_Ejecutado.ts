import { 
    ViewEntity,
    Column,
} from "typeorm";
    
@ViewEntity('supervision_ejecutado')
class Supervision{
    
    @Column('character varying')
    sector:string  ;

    @Column('integer')
    orden: number;

    @Column('text')
    descripcion:string ;

    @Column('text')
    ubicacion:string ;

    @Column('bigint')
    ejecutado:number ;

}
    
export default Supervision;