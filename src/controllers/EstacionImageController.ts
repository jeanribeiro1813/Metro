import { Request, Response } from 'express';

import AppError from '../errors/AppError';

import UpdateEstacioneImageService from '../services/Estaciones/UpdateEstacioneImageService';

export default class EstacionImageController {
  // Um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete
  public async update(request: Request, response: Response): Promise<Response> {
    const updateEstacioneImage = new UpdateEstacioneImageService();

    const {id,img_field} = request.body;
    
    if(request.file){
      const image_filename = request.file.filename;
      const updatedEstacione = await updateEstacioneImage.execute({
        id,
        img_field,
        image_filename
      })
      return response.json(updatedEstacione);
    }else{
      throw new AppError(
        '¡Por favor inserta una imagen!',
        400,
      );
    }
    
  }
}
