import { getCustomRepository, Not, IsNull } from 'typeorm'
import AppError from '../../errors/AppError';

import PMTRepository from '../../typeorm/repositories/PMTRepository'

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

class SetUpPMTLayerService{
    public async execute ({byView, view}:ISetUpLayerProps): Promise<ILayer | {}> {

        const pmtRepository = getCustomRepository(PMTRepository);

        const pmt = byView && view? await pmtRepository.indexByView({view}): await pmtRepository.index();

        if(!pmt){
            throw new AppError('PMT not found');
        }

        const layer = "PMT";
        let markers = "";
        const source = pmt.map((pmt) =>{
            const tag = "PMT";
            const popup = `L.popup({ autoClose: false, closeOnClick: false }).setContent('<label class="textPrimary">${tag}:</label><br><label class="textSecondary">${pmt.acciones}</label>'+'<br><button value="${layer}---${tag}---${pmt.id}" class="popupButton" onclick="handleEditClick(this.value)">Edit</button>').openPopup()`;
            const tooltip  = `L.tooltip({
              direction: 'right',
              permanent: true,
              interactive: true,
              noWrap: true,
              opacity: 0.9
            }).setContent('<label class="textEstaciones">${pmt.id}</label>')`

            const markerIcon = `L.icon({
                iconUrl: 'https://metropanama-test.herokuapp.com/files/ubicacion/trem.png',
                        iconSize:     [38, 40], 
                        iconAnchor:   [35, 15], 
                        popupAnchor:  [0, 0] 
              })`;

            markers = markers + `L.marker([${pmt.n}, ${pmt.e}]).setIcon(${markerIcon}).bindPopup(${popup}).bindTooltip(${tooltip}),`

            const itemOfSource = {
                id: pmt.id,
                tag,
                description:pmt.id,
                latitude:pmt.n,
                longitude:pmt.e,
            }

            return itemOfSource;
        })

        const strLayerGroup = `L.layerGroup([${markers}])`;

        return {
            layer,
            source,
            strLayerGroup
        };
    }
}

export default SetUpPMTLayerService;
