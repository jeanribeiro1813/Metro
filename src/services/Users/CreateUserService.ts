import {getCustomRepository} from 'typeorm'
import User from '../../typeorm/entities/User';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

import BCryptHashProvider from '../../providers/BCryptHashProvider'
import AppError from '../../errors/AppError';

interface IRequestDTO {
  nombre:string ;
  profesion:string;
  email:string;
  acesso:string;
  contrasena:string;
  user_situa:string;
  contacto:string;
}

class CreateUserService {

  public async execute({nombre, profesion, email, acesso, contrasena, user_situa, contacto}: IRequestDTO): Promise<User> {
    
    const usersRepository = getCustomRepository(UsersRepository);
    
    const hashProvider = new BCryptHashProvider();

    const checkUserExists = await usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hasedPassword = await hashProvider.generateHash(contrasena);

    const user = await usersRepository.create({
      nombre,
      profesion,
      email,
      acesso,
      contrasena:hasedPassword,
      user_situa,
      contacto
    });

    user.contrasena = "";
    return user;
  }
}

export default CreateUserService;
