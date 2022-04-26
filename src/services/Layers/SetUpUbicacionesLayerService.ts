import { getCustomRepository, Not, IsNull } from 'typeorm'
import AppError from '../../errors/AppError';

import UbicacionesRepository from '../../typeorm/repositories/UbicacionesRepository'

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

class SetUpUbicacionesLayerService{
    public async execute ({byView, view}:ISetUpLayerProps): Promise<ILayer | {}> {

        const ubicacionesRepository = getCustomRepository(UbicacionesRepository);

        const ubicaciones = byView && view? await ubicacionesRepository.indexByView({view}): await ubicacionesRepository.index();

        if(!ubicaciones){
            throw new AppError('Ubicaciones not found');
        }

        const layer = "Ubicaciones";
        let markers = "";
        const source = ubicaciones.map((ubicacion) =>{
            const tag = "Ubicácion";
            const popup = `L.popup({ autoClose: false, closeOnClick: false }).setContent('<label class="textPrimary">${tag}:</label><br><label class="textSecondary">${ubicacion.ubicacion}</label>'+'<br><button value="${layer}---${tag}---${ubicacion.id}" class="popupButton" onclick="handleEditClick(this.value)">Edit</button>').openPopup()`;
            const tooltip  = `L.tooltip({
              direction: 'right',
              permanent: true,
              interactive: true,
              noWrap: true,
              opacity: 0.9
            }).setContent('<label class="textUbicaciones">${ubicacion.ubicacion}</label>')`

            const markerIcon = `L.icon({
                iconUrl: 'https://metropanama-test.herokuapp.com/files/ubicacion/trem.png',
                        iconSize:     [38, 40], 
                        iconAnchor:   [35, 15], 
                        popupAnchor:  [0, 0] 
              })`;

            markers = markers + `L.marker([${ubicacion.norte}, ${ubicacion.este}]).setIcon(${markerIcon}).bindPopup(${popup}).bindTooltip(${tooltip}),`

            const itemOfSource = {
                id: ubicacion.id,
                tag,
                description:ubicacion.ubicacion,
                latitude:ubicacion.norte,
                longitude:ubicacion.este,
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

export default SetUpUbicacionesLayerService;