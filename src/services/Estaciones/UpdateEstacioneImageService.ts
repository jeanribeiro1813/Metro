import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Estacion from '../../typeorm/entities/Estacion';
import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository';
import StorageProvider from '../../providers/DiskStorageProvider';



interface IRequestDTO {
  id: string;
  img_field: string;
  image_filename: string;
}
class UpdateEstacioneImageService {

  public async execute({
    id,
    img_field,
    image_filename
  }: IRequestDTO): Promise<Estacion> {

    const estacionesRepository = getCustomRepository(EstacionesRepository);
    const storageProvider = new StorageProvider();

    const estacion = await estacionesRepository.findById(id);

    if (!estacion) {
      throw new AppError(
        'Estacion not found!',
        400,
      );
    }

    let targetKey = "";
    Object.keys(estacion)
    .forEach(key => {
      if(key===img_field){
        targetKey=key;
      }
    });
    
    const imgPath = <string>estacion[img_field as keyof Estacion];
    if (imgPath) {
      await storageProvider.deleteEstacionImgFile(imgPath);
    }

    const savedFileName = await storageProvider.saveEstacionImgFile(image_filename);

    const updatedEstacion = {...estacion,[img_field]:savedFileName};

    await estacionesRepository.save(updatedEstacion);

    return updatedEstacion;
  }
}

export default UpdateEstacioneImageService;
