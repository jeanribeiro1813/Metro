import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Pilote from '../typeorm/entities/Pilote';
import PilotesRepository from '../typeorm/repositories/PilotesRepository';
import StorageProvider from '../providers/DiskStorageProvider';



interface IRequestDTO {
  pilote_id: string;
  img_1: string;
  img_2: string;
  img_3: string;
}
class UpdatePiloteImagesArrayService {

  public async execute({
    pilote_id,
    img_1,
    img_2,
    img_3
  }: IRequestDTO): Promise<Pilote> {

    const pilotesRepository = getCustomRepository(PilotesRepository);
    const storageProvider = new StorageProvider();

    const pilote = await pilotesRepository.findById(pilote_id);

    if (!pilote) {
      throw new AppError(
        'Pilote not found!',
        400,
      );
    }

    if (pilote.img_1) {
      storageProvider.deletePiloteImgFile(pilote.img_1);
    }

    if (pilote.img_2) {
      storageProvider.deletePiloteImgFile(pilote.img_2);
    }

    if (pilote.img_3) {
      storageProvider.deletePiloteImgFile(pilote.img_3);
    }
    const savedImg1Name = await storageProvider.savePiloteImgFile(img_1);
    const savedImg2Name = await storageProvider.savePiloteImgFile(img_2);
    const savedImg3Name = await storageProvider.savePiloteImgFile(img_3);

    pilote.img_1 = savedImg1Name;
    pilote.img_2 = savedImg2Name;
    pilote.img_3 = savedImg3Name;
    // A instância do user capturado no banco já está criada em user!

    await pilotesRepository.save(pilote);
    // Salva a alteração da instância no banco

    return pilote;
  }
}

export default UpdatePiloteImagesArrayService;
