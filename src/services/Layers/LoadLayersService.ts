import SetUpSupervisionLayerService from './SetUpSupervisionLayerService'
import SetUpEstacionesLayerService from './SetUpEstacionesLayerService'
import SetUpSSOMAPMTLayerService from './SetUpSSOMAPMTLayerService'


import AppError from '../../errors/AppError';

interface ILayerOfMap {
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

interface ILoadLayerProps {
    view?:{
        southWestLng: number;
        southWestLat: number;
        northEastLng: number;
        northEastLat: number;
    }
}

class LoadLayersService{
    public async execute ({view}:ILoadLayerProps): Promise<ILayerOfMap[]> {

        const setUpSupervisionLayer = new SetUpSupervisionLayerService();
        const setUpEstacionesLayer = new SetUpEstacionesLayerService();
        const SetUpSSOMAPMTLayer = new SetUpSSOMAPMTLayerService();

        const setUpLayerProps = {
            byView: view?true:false,
            view
        }
        const supervisionLayer = await setUpSupervisionLayer.execute(setUpLayerProps);
        const estacionesLayer = await setUpEstacionesLayer.execute(setUpLayerProps);
        const SSOMAPMTLayer = await SetUpSSOMAPMTLayer.execute(setUpLayerProps); 


        if(!supervisionLayer && !estacionesLayer){
           throw new AppError("Layers not found");
        }
        
        const layers = <ILayerOfMap[]>[
            supervisionLayer,
            estacionesLayer,
            SSOMAPMTLayer
        ];



        return layers;
    }
}

export default LoadLayersService;