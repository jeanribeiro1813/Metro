import { getCustomRepository, getRepository, getManager } from 'typeorm'

import Ubicacion from '../../typeorm/entities/Ubicacion'
import UbicacionesRepository from '../../typeorm/repositories/UbicacionesRepository'
import Supervision from '../../typeorm/entities/Supervision'
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'

interface IRequestDTO {
    geomFromText: string[];
}

interface IResponse {
    bounds: number[][];
}

class GenerateFoundEntitiesBoundsService{
    public async execute ({geomFromText}:IRequestDTO): Promise<IResponse | undefined> {

        const query = `
            SELECT Box2D(
                ST_Collect(
                    ARRAY[${geomFromText.toString()}]
                )   
            ) As box;
        `
        const result = await getManager().query(query);
        
        
        
        if(result.length){

            let {box} = result[0];

            box = box.replace("BOX(","");
            box = box.replace(")","");
            box = box.replace(","," ");
            
            const coords = box.split(" ");
    
            const bounds = [
                [Number(coords[0]), Number(coords[1])],
                [Number(coords[2]), Number(coords[3])]
            ]

            return {bounds};
        }else{
            return undefined;
        }
    }
}

export default GenerateFoundEntitiesBoundsService;