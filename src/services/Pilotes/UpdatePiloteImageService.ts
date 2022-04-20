import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Pilote from '../../typeorm/entities/Pilote';
import PilotesRepository from '../../typeorm/repositories/PilotesRepository';
import StorageProvider from '../../providers/DiskStorageProvider';



interface IRequestDTO {
  id: string;
  img_field: string;
  image_filename: string;
}
class UpdatePiloteImageService {

  public async execute({
    id,
    img_field,
    image_filename
  }: IRequestDTO): Promise<Pilote> {

    const pilotesRepository = getCustomRepository(PilotesRepository);
    const storageProvider = new StorageProvider();

    const pilote = await pilotesRepository.findById(id);

    if (!pilote) {
      throw new AppError(
        'Pilote not found!',
        400,
      );
    }

    let targetKey = "";
    Object.keys(pilote)
    .forEach(key => {
      if(key===img_field){
        targetKey=key;
      }
    });
    
    const imgPath = <string>pilote[img_field as keyof Pilote];
    if (imgPath) {
      await storageProvider.deletePiloteImgFile(imgPath);
    }

    const savedFileName = await storageProvider.savePiloteImgFile(image_filename);

    const updatedPilote = {...pilote,[img_field]:savedFileName};

    await pilotesRepository.save(updatedPilote);

    return updatedPilote;
  }
}

export default UpdatePiloteImageService;
