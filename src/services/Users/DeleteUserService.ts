import {getCustomRepository} from 'typeorm'
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import AppError from '../../errors/AppError';

interface IRequestDTO {
  id:string ;

}

class DeleteUserService {

  public async remove({id}: IRequestDTO): Promise<void> {
    
    const usersRepository = getCustomRepository(UsersRepository);

    const checkUserExists = await usersRepository.findById(id);

    if (!checkUserExists) {
      throw new AppError('Usuario não existe , por favor verificar');
    }

     await usersRepository.remove(checkUserExists);
  
  }
}

export default DeleteUserService;
