import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import User from '../../typeorm/entities/User';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import BCryptHashProvider from '../../providers/BCryptHashProvider'

interface IRequestDTO {
  user_id: string;
  nombre: string;
  email: string;
  contacto: string;
  profesion: string;
  old_password?: string;
  new_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    nombre,
    email,
    contacto,
    profesion,
    old_password,
    new_password
  }: IRequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const hashProvider = new BCryptHashProvider();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!',401,);
    }

    const userWithEmailToUpdate = await usersRepository.findByEmail(email);

    if (userWithEmailToUpdate && userWithEmailToUpdate.id !== user_id) {
      throw new AppError('New e-mail already used by another user!',401);
    }

    user.nombre = nombre;
    user.email = email;
    user.contacto = contacto;
    user.profesion = profesion;

    if(new_password && !old_password){
      throw new AppError('You need to inform the old password to set a new one!',401);
    }

    if(new_password && old_password){
      const checkOldPassword = await hashProvider.compareHash(
        old_password,
        user.contrasena
      )

      if(!checkOldPassword){
        throw new AppError('Old password does not match!',401);
      }
      user.contrasena =  await hashProvider.generateHash(new_password);
    }

    return await usersRepository.save(user);
  }
}

export default UpdateProfileService;
