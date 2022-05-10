import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Supervision from '../../typeorm/entities/Supervision';
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository';
import StorageProvider from '../../providers/DiskStorageProvider';



interface IRequestDTO {
  id: string;
  img_field: string;
  image_filename: string;
}
class UpdateSupervisionImageService {

  public async execute({
    id,
    img_field,
    image_filename
  }: IRequestDTO): Promise<Supervision> {

    const supervisionRepository = getCustomRepository(SupervisionRepository);
    const storageProvider = new StorageProvider();

    const supervision = await supervisionRepository.findById(id);

    if (!supervision) {
      throw new AppError(
        'Supervision not found!',
        400,
      );
    }

    let targetKey = "";
    Object.keys(supervision)
    .forEach(key => {
      if(key===img_field){
        targetKey=key;
      }
    });
    
    const imgPath = <string>supervision[img_field as keyof Supervision];
    if (imgPath) {
      await storageProvider.deleteSupervisionImgFile(imgPath);
    }

    const savedFileName = await storageProvider.saveSupervisionImgFile(image_filename);

    const updatedSupervision = {...supervision,[img_field]:savedFileName};

    await supervisionRepository.save(updatedSupervision);

    return updatedSupervision;
  }
}

export default UpdateSupervisionImageService;
