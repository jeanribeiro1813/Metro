import { Repository, EntityRepository, getRepository } from 'typeorm';

import User from '../entities/User';

interface ICreateUserDTO {
    nombre:string ;
    profesion:string;
    email:string;
    acesso:string;
    contrasena:string;
    user_situa:string;
    contacto:string;
}

interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}
  
@EntityRepository(User)
class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;
    
    public async findById(id: string): Promise<User | undefined> {
        this.ormRepository = getRepository(User);
        const user = await this.ormRepository.findOne(id);
        return user;
    }
  
    public async findByEmail(email: string): Promise<User | undefined> {
        this.ormRepository = getRepository(User);
        const user = await this.ormRepository.findOne({
            where: { email },
        });
      return user;
    }
  
    public async create({
        nombre,
        profesion,
        email,
        acesso,
        contrasena,
        user_situa,
        contacto
    }: ICreateUserDTO): Promise<User> {
        this.ormRepository = getRepository(User);

        const user = this.ormRepository.create({
            nombre,
            profesion,
            email,
            acesso,
            contrasena,
            user_situa,
            contacto
        });
  
        await this.ormRepository.save(user);
  
        return user;
    }
  
    public async save(user: User): Promise<User> {
        this.ormRepository = getRepository(User);

         return this.ormRepository.save(user);
    }

}

export default UsersRepository;
