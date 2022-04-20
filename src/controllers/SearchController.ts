import { Request, Response } from 'express';

import SearchEntityService from '../services/Search/SearchEntityService';

export default class SearchController {
  public async execute(request: Request, response: Response): Promise<Response> {

    const { selected_class, entity } = request.body;

    const searchEntity = new SearchEntityService();

    const entities = await searchEntity.execute({
      selectedClass:selected_class,
      entity,
    });

    return response.json(entities);
  }
}
