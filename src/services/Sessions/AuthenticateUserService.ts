import { getCustomRepository } from 'typeorm'

import { sign } from 'jsonwebtoken';

import authConfig from '../../config/auth';

import AppError from '../../errors/AppError';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import HashProvider from '../../providers/BCryptHashProvider';

import User from '../../typeorm/entities/User';

interface IRequestDTO {
  email: string;
  contrasena: string;
}

interface IResponseDTO {
  // user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    contrasena,
  }: IRequestDTO): Promise<IResponseDTO> {
    const hashProvider = new HashProvider();

    const usersRepository = getCustomRepository(UsersRepository);    
    
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await hashProvider.compareHash(contrasena, user.contrasena);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,  
    });

    user.contrasena = "";

    return {

      token,
    };
  }
}

export default AuthenticateUserService;
