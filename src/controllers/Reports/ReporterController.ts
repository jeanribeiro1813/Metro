import { Request, Response } from 'express';
import ReporteSupervisionService from '../../services/Reports/Reportservice';


export default class ReporterSupervisionController {

  public async showFull(request: Request, response: Response): Promise<Response> {

    const loadSupervision = new ReporteSupervisionService();

    const supervision = await loadSupervision.show();

    return response.json(supervision);

  }

  public async showId(request: Request, response: Response): Promise<Response> {

    const { id } = request.params

    const loadSupervision = new ReporteSupervisionService();

    const supervision = await loadSupervision.showId(id);

    return response.json(supervision);

  }

  public async ShowFilter(request: Request, response: Response): Promise<Response> {

    const { fim_perfu } = request.body

    const loadSupervision = new ReporteSupervisionService();

    const supervision = await loadSupervision.showfilter(fim_perfu);

    return response.json(supervision);

  }
}






