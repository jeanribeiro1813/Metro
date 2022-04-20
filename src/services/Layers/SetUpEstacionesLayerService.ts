import { getCustomRepository, Not, IsNull } from 'typeorm'
import AppError from '../../errors/AppError';

import EstacionesRepository from '../../typeorm/repositories/EstacionesRepository'

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

class SetUpEstacionesLayerService{
    public async execute ({byView, view}:ISetUpLayerProps): Promise<ILayer | {}> {

        const estacionesRepository = getCustomRepository(EstacionesRepository);

        const estaciones = byView && view? await estacionesRepository.indexByView({view}): await estacionesRepository.index();

        if(!estaciones){
            throw new AppError('Estaciones not found');
        }

        const layer = "Estaciones";
        let markers = "";
        const source = estaciones.map((estacion) =>{
            const tag = "Ubicácion";
            const popup = `L.popup({ autoClose: false, closeOnClick: false }).setContent('<label class="textPrimary">${tag}:</label><br><label class="textSecondary">${estacion.estacion}</label>'+'<br><button value="${layer}---${tag}---${estacion.id}" class="popupButton" onclick="handleEditClick(this.value)">Edit</button>').openPopup()`;
            const tooltip  = `L.tooltip({
              direction: 'right',
              permanent: true,
              interactive: true,
              noWrap: true,
              opacity: 0.9
            }).setContent('<label class="textEstaciones">${estacion.estacion}</label>')`

            const markerIcon = `L.icon({
                iconUrl: 'https://metropanama-test.herokuapp.com/files/ubicacion/trem.png',
                        iconSize:     [38, 40], 
                        iconAnchor:   [35, 15], 
                        popupAnchor:  [0, 0] 
              })`;

            markers = markers + `L.marker([${estacion.norte}, ${estacion.este}]).setIcon(${markerIcon}).bindPopup(${popup}).bindTooltip(${tooltip}),`

            const itemOfSource = {
                id: estacion.id,
                tag,
                description:estacion.estacion,
                latitude:estacion.norte,
                longitude:estacion.este,
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

export default SetUpEstacionesLayerService;