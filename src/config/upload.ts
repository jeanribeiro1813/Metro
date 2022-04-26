import path from 'path';
import crypto from 'crypto';
import multer, {StorageEngine} from 'multer';

const uploadsFolder = path.resolve(__dirname,'..','..','uploads')

interface IUploadConfig {
  driver: 'disk';
  uploadsFolder: string;
  avatarsUploadFolder: string;
  supervisionImgsUploadFolder: string;
  ubicacionesImgsUploadFolder: string;
  multer: {
    storage: StorageEngine;
  }
}

export default {

    driver: 'disk',
    uploadsFolder: uploadsFolder,
    avatarsUploadFolder: path.resolve(uploadsFolder,'avatars'),
    supervisionImgsUploadFolder: path.resolve(uploadsFolder,'Supervision'),
    ubicacionesImgsUploadFolder: path.resolve(uploadsFolder,'Ubicaciones'),

    multer: {
      storage: multer.diskStorage({
        destination: uploadsFolder,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}_${file.originalname}`;
            return callback(null,fileName);
        },
      }),
    }

} as IUploadConfig;
