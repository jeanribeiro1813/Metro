import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('users')
class User{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('varchar')
    nombre:string ;

    @Column('varchar')
    profesion:string   ;

    @Column('varchar',{ unique: true })
    email:string;

    @Column('varchar')
    acesso:string ;

    @Column('varchar')
    contrasena:string  ;

    @Column('varchar')
    user_situa:string   ;

    @Column('integer')
    contacto:string   ;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column('varchar')
    avatar:string;
    /*
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.contrasena = bcrypt.hashSync(this.contrasena,8)
    }
    */
}

export default User;