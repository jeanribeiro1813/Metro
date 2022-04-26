import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/upload';

interface IStorageProvider {
  saveAvatarFile(file:string) : Promise<string>;
  deleteAvatarFile(file:string) : Promise<void>;
  saveSupervisionImgFile(file:string) : Promise<string>;
  deleteSupervisionImgFile(file:string) : Promise<void>;  
  saveUbicacionImgFile(file:string) : Promise<string>;
  deleteUbicacionImgFile(file:string) : Promise<void>;  
}

export default class DiskStorageProvider implements IStorageProvider{
    public async saveAvatarFile(file:string): Promise<string>{
      const from = path.resolve(uploadConfig.uploadsFolder, file);
      const to = path.resolve(uploadConfig.avatarsUploadFolder, file);
      await fs.promises.rename(
        //path.resolve(uploadConfig.uploadsFolder, file),
        //path.resolve(uploadConfig.avatarsUploadFolder, file),
        from,
        to,
      )

      return file;
    }

    public async deleteAvatarFile(file:string): Promise<void>{

      const filePath = path.resolve(uploadConfig.avatarsUploadFolder, file);

      //verificando se o arquivo existe -> fs.promises.stat(filePath);
      try{
        await fs.promises.stat(filePath);
      }
      catch{
        //se não encontrou um arquivo, retorna um erro
        return;
      }
      //se encontrou o arquivo, vem direto pra cá!
      await fs.promises.unlink(filePath);
    }

    public async saveSupervisionImgFile(file:string): Promise<string>{
      const from = path.resolve(uploadConfig.uploadsFolder, file);
      const to = path.resolve(uploadConfig.supervisionImgsUploadFolder, file)
      await fs.promises.rename(
        from,
        to,
      )

      return file;
    }

    public async deleteSupervisionImgFile(file:string): Promise<void>{

      const filePath = path.resolve(uploadConfig.supervisionImgsUploadFolder, file);

      //verificando se o arquivo existe -> fs.promises.stat(filePath);
      try{
        await fs.promises.stat(filePath);
      }
      catch{
        //se não encontrou um arquivo, retorna um erro
        return;
      }
      //se encontrou o arquivo, vem direto pra cá!
      await fs.promises.unlink(filePath);
    }

    public async saveUbicacionImgFile(file:string): Promise<string>{
      const from = path.resolve(uploadConfig.uploadsFolder, file);
      const to = path.resolve(uploadConfig.ubicacionesImgsUploadFolder, file)
      await fs.promises.rename(
        from,
        to,
      )

      return file;
    }

    public async deleteUbicacionImgFile(file:string): Promise<void>{

      const filePath = path.resolve(uploadConfig.ubicacionesImgsUploadFolder, file);

      //verificando se o arquivo existe -> fs.promises.stat(filePath);
      try{
        await fs.promises.stat(filePath);
      }
      catch{
        //se não encontrou um arquivo, retorna um erro
        return;
      }
      //se encontrou o arquivo, vem direto pra cá!
      await fs.promises.unlink(filePath);
    }    
}
