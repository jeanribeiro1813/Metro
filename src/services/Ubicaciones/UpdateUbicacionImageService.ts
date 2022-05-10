import { getCustomRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Ubicacion from '../../typeorm/entities/Ubicacion';
import UbicacionesRepository from '../../typeorm/repositories/UbicacionesRepository';
import StorageProvider from '../../providers/DiskStorageProvider';



interface IRequestDTO {
  id: string;
  img_field: string;
  image_filename: string;
}
class UpdateUbicacioneImageService {

  public async execute({
    id,
    img_field,
    image_filename
  }: IRequestDTO): Promise<Ubicacion> {

    const ubicacionesRepository = getCustomRepository(UbicacionesRepository);
    const storageProvider = new StorageProvider();

    const ubicacion = await ubicacionesRepository.findById(id);

    if (!ubicacion) {
      throw new AppError(
        'Ubicacion not found!',
        400,
      );
    }

    let targetKey = "";
    Object.keys(ubicacion)
    .forEach(key => {
      if(key===img_field){
        targetKey=key;
      }
    });
    
    const imgPath = <string>ubicacion[img_field as keyof Ubicacion];
    if (imgPath) {
      await storageProvider.deleteUbicacionImgFile(imgPath);
    }

    const savedFileName = await storageProvider.saveUbicacionImgFile(image_filename);

    const updatedUbicacion = {...ubicacion,[img_field]:savedFileName};

    await ubicacionesRepository.save(updatedUbicacion);

    return updatedUbicacion;
  }
}

export default UpdateUbicacioneImageService;
