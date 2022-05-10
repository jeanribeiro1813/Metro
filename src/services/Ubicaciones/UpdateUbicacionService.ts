import { getCustomRepository } from 'typeorm'
import Ubicacion from '../../typeorm/entities/Ubicacion'
import UbicacionesRepository from '../../typeorm/repositories/UbicacionesRepository'
import AppError from '../../errors/AppError';

interface IRequestDTO {
    id:string;
    este?:string;
    norte?:string;
    ubicacion?:string;
    img_1_obs?:string;
    img_2_obs?:string;
    img_3_obs?:string;
}

class UpdateUbicacionService{
    public async execute(
        {
            id,
            este,
            norte,
            ubicacion,
            img_1_obs,
            img_2_obs,
            img_3_obs
        }:IRequestDTO
    ): Promise<Ubicacion | undefined>{
        const ubicacionesRepository = getCustomRepository(UbicacionesRepository);

        const storagedUbicacion = await ubicacionesRepository.findById(id);

        if(!storagedUbicacion){
            throw new AppError('Supervision does not exists!'); 
        }

        storagedUbicacion.este = este ? este : storagedUbicacion.este; 
        storagedUbicacion.norte = norte ? norte : storagedUbicacion.norte;  
        storagedUbicacion.ubicacion = ubicacion ? ubicacion : storagedUbicacion.ubicacion;
        storagedUbicacion.img_1_obs = img_1_obs ? img_1_obs : storagedUbicacion.img_1_obs;
        storagedUbicacion.img_2_obs = img_2_obs ? img_2_obs : storagedUbicacion.img_2_obs;
        storagedUbicacion.img_3_obs = img_3_obs ? img_3_obs : storagedUbicacion.img_3_obs;  

        await ubicacionesRepository.save(storagedUbicacion);

        return storagedUbicacion;
     
    }

}


export default UpdateUbicacionService;

