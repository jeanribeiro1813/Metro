
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';

import User from '../../typeorm/entities/User';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

interface IRequestDTO {
  user_id: string;
}

class ShowProfileService {
  public async execute({user_id}: IRequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!',401);
    }

    return user
  }
}

export default ShowProfileService;
