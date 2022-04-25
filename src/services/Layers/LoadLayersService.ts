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
            byView: view ? true:false,
            view,
        }

        const supervisionLayer = await setUpSupervisionLayer.execute(setUpLayerProps, '');
        const supervisionPilotesLayer = await setUpSupervisionLayer.execute(setUpLayerProps, 'Pilotes');
        const supervisionColummnasLayer = await setUpSupervisionLayer.execute(setUpLayerProps, 'Colummnas');
        const supervisionCapitelLayer = await setUpSupervisionLayer.execute(setUpLayerProps, 'Capitel');
        const supervisionVigaLayer = await setUpSupervisionLayer.execute(setUpLayerProps, 'Viga');
        

        const estacionesLayer = await setUpEstacionesLayer.execute(setUpLayerProps);
        const SSOMAPMTLayer = await SetUpSSOMAPMTLayer.execute(setUpLayerProps); 
        
        const layers = <ILayerOfMap[]>[
            supervisionLayer,
            supervisionPilotesLayer,
            supervisionColummnasLayer,
            supervisionCapitelLayer,
            supervisionVigaLayer,
            estacionesLayer,
            SSOMAPMTLayer
        ];

        if(!layers){
            throw new AppError("Layers not found");
         }



        return layers;
    }
}

export default LoadLayersService;