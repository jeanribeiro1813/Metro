import { getCustomRepository, Not, IsNull } from 'typeorm'
import AppError from '../../errors/AppError';

import SupervisionRepository from '../../typeorm/repositories/SupervisionRepository'

interface ILayer {
    layer: string;
    source: IItemOfSource[];
    strLayerGroup: string;
    strMarkers?: string;
}

interface IItemOfSource {
    id: string;
    tag: string;
    description: string;
    latitude: string;
    longitude: string;
}

interface ISetUpLayerProps {
    byView?: boolean;
    view?:{
        southWestLng: number;
        southWestLat: number;
        northEastLng: number;
        northEastLat: number;
    }
}

class SetUpSupervisionLayerService{
    public async execute ({byView,view}:ISetUpLayerProps): Promise<ILayer> {
        const supervisionRepository = getCustomRepository(SupervisionRepository);

        const dados = byView && view? await supervisionRepository.indexByView({view}): await supervisionRepository.index();

        if(!dados){
            throw new AppError('Supervisions not found');
        }

        const layer = "Supervision";
        let markers = "";
        const source = dados.map((obj) =>{
            const tag = "Supervision";
            const popup = `L.popup({ autoClose: false, closeOnClick: false }).setContent('<label class="textPrimary">${tag}:</label><br><label class="textSecondary">${obj.pilha}</label>'+'<br><button value="${layer}---${tag}---${obj.id}" class="popupButton" onclick="handleEditClick(this.value)">Editar</button>').openPopup()`;
            const tooltip  = `L.tooltip({
              direction: 'right',
              permanent: true,
              interactive: true,
              noWrap: true,
              opacity: 0.9
            }).setContent('<label class="textSecondary">${obj.pilha}</label>')`
            markers = markers + `L.marker([${obj.n}, ${obj.e}]).bindPopup(${popup}).bindTooltip(${tooltip}),`            
            
            const itemOfSource = {
                id: obj.id,
                tag,
                description:obj.pilha,
                latitude:obj.n,
                longitude:obj.e,
            }

            return itemOfSource;
        })

        markers=markers.replace(/,([^,]*)$/, '$1');
        const strLayerGroup = `L.layerGroup([${markers}])`;
        const strMarkers = `[${markers}]`;
        return {
            layer,
            source,
            strLayerGroup,
            strMarkers,
        };
    }
}

export default SetUpSupervisionLayerService;