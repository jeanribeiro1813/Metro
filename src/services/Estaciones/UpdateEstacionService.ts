import { getCustomRepository } from 'typeorm'
import Estacion from '../../typeorm/entities/Estacion'
import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository'
import AppError from '../../errors/AppError';

interface IRequestDTO {
    id:string;
    este?:string;
    norte?:string;
    estacion?:string;
    img_1_obs?:string;
    img_2_obs?:string;
    img_3_obs?:string;
}

class UpdateEstacionService{
    public async execute(
        {
            id,
            este,
            norte,
            estacion,
            img_1_obs,
            img_2_obs,
            img_3_obs
        }:IRequestDTO
    ): Promise<Estacion | undefined>{
        const estacionesRepository = getCustomRepository(EstacionesRepository);

        const storagedEstacion = await estacionesRepository.findById(id);

        if(!storagedEstacion){
            throw new AppError('Supervision does not exists!'); 
        }

        storagedEstacion.este = este ? este : storagedEstacion.este; 
        storagedEstacion.norte = norte ? norte : storagedEstacion.norte;  
        storagedEstacion.estacion = estacion ? estacion : storagedEstacion.estacion;
        storagedEstacion.img_1_obs = img_1_obs ? img_1_obs : storagedEstacion.img_1_obs;
        storagedEstacion.img_2_obs = img_2_obs ? img_2_obs : storagedEstacion.img_2_obs;
        storagedEstacion.img_3_obs = img_3_obs ? img_3_obs : storagedEstacion.img_3_obs;  

        await estacionesRepository.save(storagedEstacion);

        return storagedEstacion;
     
    }

}


export default UpdateEstacionService;

