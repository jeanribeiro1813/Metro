import { Request, Response } from 'express';

import AppError from '../errors/AppError';

import UpdateSupervisionImageService from '../services/Supervision/UpdateSupervisionImageService';

export default class SupervisionImageController {
  // Um CONTROLLER deve ter no máximo 5 métodos:
  // index, show, create, update, delete
  public async update(request: Request, response: Response): Promise<Response> {
    const updateSupervisionImage = new UpdateSupervisionImageService();

    const {id,img_field} = request.body;
    
    if(request.file){
      const image_filename = request.file.filename;
      const updatedSupervision = await updateSupervisionImage.execute({
        id,
        img_field,
        image_filename
      })
      return response.json(updatedSupervision);
    }else{
      throw new AppError(
        '¡Por favor inserta una imagen!',
        400,
      );
    }
    
  }
}
