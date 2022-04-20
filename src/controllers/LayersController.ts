import { Request, Response } from 'express';

import LoadLayersService from '../services/Layers/LoadLayersService';

export default class LayersController {
  public async index(request: Request, response: Response): Promise<Response> {

    const loadLayers = new LoadLayersService();

    const layers = await loadLayers.execute({});

    return response.json(layers);
  }
  public async view(request: Request, response: Response): Promise<Response> {

    const {southWestLng,southWestLat,northEastLng,northEastLat} = request.body;

    const loadLayers = new LoadLayersService();

    const layers = await loadLayers.execute({
      view:{
        southWestLng,
        southWestLat,
        northEastLng,
        northEastLat
      }
    });

    return response.json(layers);
  }
}
