import { getCustomRepository } from 'typeorm'
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
    };
    
}

class SetUpSupervisionLayerService{

    public async execute ({byView,view}:ISetUpLayerProps, theme:string): Promise<ILayer> {

        const supervisionRepository = getCustomRepository(SupervisionRepository);

        const dados = byView && view? await supervisionRepository.indexByView({view}, theme): await supervisionRepository.index(theme);

        if(!dados){
            throw new AppError('Supervisions not found');
        }

        const layer = theme === 'Pilotes' || theme === 'Columnas' || theme === 'Capitel' || theme === 'Vigas' ? 'supervision' : theme.toLowerCase();
        let markers = "";
        const source = dados.map((obj) =>{
            const tag = theme;
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
        const strLayerGroup = `[${markers}]`;
        //const strMarkers = `[${markers}]`;
        return {
            layer,
            source,
            strLayerGroup,
        //    strMarkers,
        };
    }
}

export default SetUpSupervisionLayerService;