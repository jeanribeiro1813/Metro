import { Request, Response } from 'express';

import AppError from '../errors/AppError';

import UpdateUbicacioneImageService from '../services/Ubicaciones/UpdateUbicacionImageService';

export default class UbicacionImageController {
  // Um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUbicacioneImage = new UpdateUbicacioneImageService();

    const {id,img_field} = request.body;
    
    if(request.file){
      const image_filename = request.file.filename;
      const updatedUbicacione = await updateUbicacioneImage.execute({
        id,
        img_field,
        image_filename
      })
      return response.json(updatedUbicacione);
    }else{
      throw new AppError(
        '¡Por favor inserta una imagen!',
        400,
      );
    }
    
  }
}
