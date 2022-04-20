import { getCustomRepository, getRepository } from 'typeorm'

import Estacion from '../../typeorm/entities/Estacion'
import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository'
import Pilote from '../../typeorm/entities/Pilote'
import PilotesRepository from '../../typeorm/repositories/PilotesRepository'
import GenerateFoundEntitiesBoundsService from './GenerateFoundEntitiesBoundsService'

interface IRequestDTO {
    selectedClass: string;
    entity: Estacion | Pilote;
}

interface IResponseDTO {
    class: string;
    entities: Estacion[] | Pilote[] | undefined;
    bounds?: number[][] | undefined;
}


class SearchEntityService{
    public async execute ({selectedClass, entity}:IRequestDTO): Promise<IResponseDTO | undefined> {

        const generateBounds = new GenerateFoundEntitiesBoundsService();
        if(selectedClass === "Pilotes"){
            const pilotesRepository = getCustomRepository(PilotesRepository);

            const pilotes = await pilotesRepository.search(entity as Pilote);

            if(pilotes?.length){
                const geomsStr = pilotes?.map(item=>{
                    return `ST_GeomFromText('POINT(${item.n} ${item.e})',4326)`
                })
    
                const result = geomsStr ? await generateBounds.execute({geomFromText:geomsStr}) : undefined;
    
                return {
                    class:selectedClass,
                    entities: pilotes,
                    bounds: result?.bounds
                }
            }else{
                return {
                    class:selectedClass,
                    entities: pilotes
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