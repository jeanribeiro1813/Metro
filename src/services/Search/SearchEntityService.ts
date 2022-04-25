import { getCustomRepository, getRepository } from 'typeorm'

import Estacion from '../../typeorm/entities/Estacion'
import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository'
import Supervision from '../../typeorm/entities/Supervision'
import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'
import GenerateFoundEntitiesBoundsService from './GenerateFoundEntitiesBoundsService'

interface IRequestDTO {
    selectedClass: string;
    entity: Estacion | Supervision;
}

interface IResponseDTO {
    class: string;
    entities: Estacion[] | Supervision[] | undefined;
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
        else if(selectedClass === "Estaciones"){
            const estacionesRepository = getCustomRepository(EstacionesRepository);

            const estaciones = await estacionesRepository.search(entity as Estacion);

            if(estaciones?.length){
                const geomsStr = estaciones?.map(item=>{
                    return `ST_GeomFromText('POINT(${item.norte} ${item.este})',4326)`
                })
    
                const result = geomsStr ? await generateBounds.execute({geomFromText:geomsStr}) : undefined;
    
                return {
                    class:selectedClass,
                    entities: estaciones,
                    bounds: result?.bounds
                }
            }else{
                return {
                    class:selectedClass,
                    entities: estaciones
                }
            }

        }

        return undefined;
    }
}

export default SearchEntityService;