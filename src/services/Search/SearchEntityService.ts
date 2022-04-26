import { getCustomRepository, getRepository } from 'typeorm'

import Ubicacion from '../../typeorm/entities/Ubicacion'
import UbicacionesRepository from '../../typeorm/repositories/UbicacionesRepository'
import Supervision from '../../typeorm/entities/Supervision'
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'
import GenerateFoundEntitiesBoundsService from './GenerateFoundEntitiesBoundsService'

interface IRequestDTO {
    selectedClass: string;
    entity: Ubicacion | Supervision;
}

interface IResponseDTO {
    class: string;
    entities: Ubicacion[] | Supervision[] | undefined;
    bounds?: number[][] | undefined;
}


class SearchEntityService{
    public async execute ({selectedClass, entity}:IRequestDTO): Promise<IResponseDTO | undefined> {

        const generateBounds = new GenerateFoundEntitiesBoundsService();
        if(selectedClass === "Supervision"){
            const supervisionRepository = getCustomRepository(SupervisionRepository);

            const supervision = await supervisionRepository.search(entity as Supervision);

            if(supervision?.length){
                const geomsStr = supervision?.map(item=>{
                    return `ST_GeomFromText('POINT(${item.n} ${item.e})',4326)`
                })
    
                const result = geomsStr ? await generateBounds.execute({geomFromText:geomsStr}) : undefined;
    
                return {
                    class:selectedClass,
                    entities: supervision,
                    bounds: result?.bounds
                }
            }else{
                return {
                    class:selectedClass,
                    entities: supervision
                }
            }


        }
        else if(selectedClass === "Ubicaciones"){
            const ubicacionesRepository = getCustomRepository(UbicacionesRepository);

            const ubicaciones = await ubicacionesRepository.search(entity as Ubicacion);

            if(ubicaciones?.length){
                const geomsStr = ubicaciones?.map(item=>{
                    return `ST_GeomFromText('POINT(${item.norte} ${item.este})',4326)`
                })
    
                const result = geomsStr ? await generateBounds.execute({geomFromText:geomsStr}) : undefined;
    
                return {
                    class:selectedClass,
                    entities: ubicaciones,
                    bounds: result?.bounds
                }
            }else{
                return {
                    class:selectedClass,
                    entities: ubicaciones
                }
            }

        }

        return undefined;
    }
}

export default SearchEntityService;