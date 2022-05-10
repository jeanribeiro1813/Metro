import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('acciones')
class Acciones{

    @PrimaryGeneratedColumn('uuid')
    id!:string  ;

    @Column('varchar')
    descripcion!:string ;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date; 
}

export default Acciones;