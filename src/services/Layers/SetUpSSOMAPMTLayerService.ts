import { getCustomRepository } from 'typeorm'
import AppError from '../../errors/AppError';

import repository from '../../typeorm/repositories/SSOMAPMTRepository'

interface ILayer {
    layer: string;
    source: IItemOfSource[];
    strLayerGroup: string;
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

class SetUpSSOMAPMTLayerService{
    public async execute ({byView, view}:ISetUpLayerProps): Promise<ILayer | {}> {

        const ssomaPmtRepository = getCustomRepository(repository);

        const dados = byView && view? await ssomaPmtRepository.indexByView({view}): await ssomaPmtRepository.index();

        if(!dados){
            throw new AppError('SSOMA y PMT not found');
        }

        const layer = "ssomaypmt";
        let markers = "";
        const source = dados.map((obj) =>{
            const tag = "SSOMA Y PMT";
            const popup = `L.popup({ autoClose: false, closeOnClick: false }).setContent('<label class="textPrimary">${tag}:</label><br><label class="textSecondary">${obj.id}</label>'+'<br><button value="${layer}---${tag}---${obj.id}" class="popupButton" onclick="handleEditClick(this.value)">Edit</button>').openPopup()`;
            const tooltip  = `L.tooltip({
              direction: 'right',
              permanent: true,
              interactive: true,
              noWrap: true,
              opacity: 0.9
            }).setContent('<label class="textUbicaciones">${obj.id}</label>')`

            //jean
            const markerIcon = `L.icon({
                iconUrl: 'files/ubicacion/trem.png',
                        iconSize:     [38, 40], 
                        iconAnchor:   [35, 15], 
                        popupAnchor:  [0, 0] 
              })`;

            markers = markers + `L.marker([${obj.n}, ${obj.e}]).setIcon(${markerIcon}).bindPopup(${popup}).bindTooltip(${tooltip}),`

            const itemOfSource = {
                id: obj.id,
                tag,
                description:obj.categoria,
                latitude:obj.n,
                longitude:obj.e,
            }

            return itemOfSource;
        })

        const strLayerGroup = `[${markers}]`;

        return {
            layer,
            source,
            strLayerGroup
        };
    }
}

export default SetUpSSOMAPMTLayerService;
