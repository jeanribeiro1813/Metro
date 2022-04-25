import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Supervision from '../../typeorm/entities/Supervision';
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository';
import StorageProvider from '../../providers/DiskStorageProvider';



interface IRequestDTO {
  supervision_id: string;
  img_1: string;
  img_2: string;
  img_3: string;
}
class UpdateSupervisionImagesService {

  public async execute({
    supervision_id,
    img_1,
    img_2,
    img_3
  }: IRequestDTO): Promise<Supervision> {

    const supervisionRepository = getCustomRepository(SupervisionRepository);
    const storageProvider = new StorageProvider();

    const supervision = await supervisionRepository.findById(supervision_id);

    if (!supervision) {
      throw new AppError(
        'Supervision not found!',
        400,
      );
    }

    if (supervision.img_1) {
      storageProvider.deleteSupervisionImgFile(supervision.img_1);
    }

    if (supervision.img_2) {
      storageProvider.deleteSupervisionImgFile(supervision.img_2);
    }

    if (supervision.img_3) {
      storageProvider.deleteSupervisionImgFile(supervision.img_3);
    }
    const savedImg1Name = await storageProvider.saveSupervisionImgFile(img_1);
    const savedImg2Name = await storageProvider.saveSupervisionImgFile(img_2);
    const savedImg3Name = await storageProvider.saveSupervisionImgFile(img_3);

    supervision.img_1 = savedImg1Name;
    supervision.img_2 = savedImg2Name;
    supervision.img_3 = savedImg3Name;
    // A instância do user capturado no banco já está criada em user!

    await supervisionRepository.save(supervision);
    // Salva a alteração da instância no banco

    return supervision;
  }
}

export default UpdateSupervisionImagesService;
