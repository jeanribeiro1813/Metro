import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import PMT from '../../typeorm/entities/PMT';
import PMTRepository from '../../typeorm/repositories/PMTRepository';
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
  }: IRequestDTO): Promise<PMT> {

    const pmTRepository = getCustomRepository(PMTRepository);
    const storageProvider = new StorageProvider();

    const pmt = await pmTRepository.findById(id);

    if (!pmt) {
      throw new AppError(
        'Pilote not found!',
        400,
      );
    }

    let targetKey = "";
    Object.keys(pmt)
    .forEach(key => {
      if(key===img_field){
        targetKey=key;
      }
    });
    
    const imgPath = <string>pmt[img_field as keyof PMT];
    if (imgPath) {
      await storageProvider.deletePiloteImgFile(imgPath);
    }

    const savedFileName = await storageProvider.savePiloteImgFile(image_filename);

    const updatedPilote = {...pmt,[img_field]:savedFileName};

    await pmTRepository.save(updatedPilote);

    return updatedPilote;
  }
}

export default UpdatePiloteImageService;
