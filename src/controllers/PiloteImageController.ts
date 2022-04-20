import { Request, Response } from 'express';

import AppError from '../errors/AppError';

import UpdatePiloteImageService from '../services/Pilotes/UpdatePiloteImageService';

export default class PiloteImageController {
  // Um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete
  public async update(request: Request, response: Response): Promise<Response> {
    const updatePiloteImage = new UpdatePiloteImageService();

    const {id,img_field} = request.body;
    
    if(request.file){
      const image_filename = request.file.filename;
      const updatedPilote = await updatePiloteImage.execute({
        id,
        img_field,
        image_filename
      })
      return response.json(updatedPilote);
    }else{
      throw new AppError(
        '¡Por favor inserta una imagen!',
        400,
      );
    }
    
  }
}
