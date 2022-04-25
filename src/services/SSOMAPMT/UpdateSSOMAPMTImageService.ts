import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import SSOMAPMT from '../../typeorm/entities/SSOMAPMT';
import SSOMAPMTRepository from '../../typeorm/repositories/SSOMAPMTRepository';
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
  }: IRequestDTO): Promise<SSOMAPMT> {

    const ssomapmtRepository = getCustomRepository(SSOMAPMTRepository);
    const storageProvider = new StorageProvider();

    const SSOMAPMT = await ssomapmtRepository.findById(id);

    if (!SSOMAPMT) {
      throw new AppError(
        'Supervision not found!',
        400,
      );
    }

    let targetKey = "";
    Object.keys(SSOMAPMT)
    .forEach(key => {
      if(key===img_field){
        targetKey=key;
      }
    });
    
    const imgPath = <string>SSOMAPMT[img_field as keyof SSOMAPMT];
    if (imgPath) {
      await storageProvider.deleteSupervisionImgFile(imgPath);
    }

    const savedFileName = await storageProvider.saveSupervisionImgFile(image_filename);

    const updatedSupervision = {...SSOMAPMT,[img_field]:savedFileName};

    await ssomapmtRepository.save(updatedSupervision);

    return updatedSupervision;
  }
}

export default UpdateSupervisionImageService;
