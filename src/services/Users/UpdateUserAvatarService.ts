import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import User from '../../typeorm/entities/User';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import StorageProvider from '../../providers/DiskStorageProvider';



interface IRequestDTO {
  user_id: string;
  avatar_filename: string;
}
class UpdateUserAvatarService {

  public async execute({
    user_id,
    avatar_filename,
  }: IRequestDTO): Promise<User> {

    const usersRepository = getCustomRepository(UsersRepository);
    const storageProvider = new StorageProvider();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Only authenticated users can update the avatar!',
        401,
      );
    }

    if (user.avatar) {
      await storageProvider.deleteAvatarFile(user.avatar);
    }

    let savedFileName = '';
    try{
      savedFileName = await storageProvider.saveAvatarFile(avatar_filename);
    }catch(err){
      throw new AppError(
        `${(err as Error).message}`,
        500,
      );
    }

    user.avatar = savedFileName;
    // A instância do user capturado no banco já está criada em user!

    await usersRepository.save(user);
    // Salva a alteração da instância no banco

    return user;
  }
}

export default UpdateUserAvatarService;