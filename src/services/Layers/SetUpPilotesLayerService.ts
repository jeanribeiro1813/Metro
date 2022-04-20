import { getCustomRepository, Not, IsNull } from 'typeorm'
import AppError from '../../errors/AppError';

import PilotesRepository from '../../typeorm/repositories/PilotesRepository'

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

class SetUpPilotesLayerService{
    public async execute ({byView,view}:ISetUpLayerProps): Promise<ILayer> {
        const pilotesRepository = getCustomRepository(PilotesRepository);

        const pilotes = byView && view? await pilotesRepository.indexByView({view}): await pilotesRepository.index();

        if(!pilotes){
            throw new AppError('Pilhas not found');
        }

        const layer = "Pilhas";
        let markers = "";
        const source = pilotes.map((pilote) =>{
            const tag = "Pilha";
            const popup = `L.popup({ autoClose: false, closeOnClick: false }).setContent('<label class="textPrimary">${tag}:</label><br><label class="textSecondary">${pilote.pilha}</label>'+'<br><button value="${layer}---${tag}---${pilote.id}" class="popupButton" onclick="handleEditClick(this.value)">Editar</button>').openPopup()`;
            const tooltip  = `L.tooltip({
              direction: 'right',
              permanent: true,
              interactive: true,
              noWrap: true,
              opacity: 0.9
            }).setContent('<label class="textSecondary">${pilote.pilha}</label>')`
            markers = markers + `L.marker([${pilote.n}, ${pilote.e}]).bindPopup(${popup}).bindTooltip(${tooltip}),`            
            
            const itemOfSource = {
                id: pilote.id,
                tag,
                description:pilote.pilha,
                latitude:pilote.n,
                longitude:pilote.e,
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

export default SetUpPilotesLayerService;