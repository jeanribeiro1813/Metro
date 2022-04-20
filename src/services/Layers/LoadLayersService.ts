import SetUpPilotesLayerService from './SetUpPilotesLayerService'
import SetUpEstacionesLayerService from './SetUpEstacionesLayerService'
import SetUpPMTLayerService from './SetUpPMTLayerService'


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

        const setUpPilotesLayer = new SetUpPilotesLayerService();
        const setUpEstacionesLayer = new SetUpEstacionesLayerService();
        const SetUpPMTLayer = new SetUpPMTLayerService();

        const setUpLayerProps = {
            byView: view?true:false,
            view
        }
        const pilotesLayer = await setUpPilotesLayer.execute(setUpLayerProps);
        const estacionesLayer = await setUpEstacionesLayer.execute(setUpLayerProps);
        const pmtLayer = await SetUpPMTLayer.execute(setUpLayerProps); 


        if(!pilotesLayer && !estacionesLayer){
           throw new AppError("Layers not found");
        }
        
        const layers = <ILayerOfMap[]>[
            pilotesLayer,
            estacionesLayer,
            pmtLayer
        ];



        return layers;
    }
}

export default LoadLayersService;