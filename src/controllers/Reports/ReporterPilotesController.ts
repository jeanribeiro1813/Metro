import { Request, Response } from 'express';
import ReportePilotesService from '../../services/Reports/ReportPilotes.service';


export default class ReporterPilotesController {

  public async showFull(request: Request, response: Response): Promise<Response> {

    const loadPilotes = new ReportePilotesService();

    const pilotes = await loadPilotes.show();

    return response.json(pilotes);

  }

  public async showId(request: Request, response: Response): Promise<Response> {

    const { id } = request.params

    const loadPilotes = new ReportePilotesService();

    const pilotes = await loadPilotes.showId(id);

    return response.json(pilotes);

  }

  public async ShowFilter(request: Request, response: Response): Promise<Response> {

    const { fim_perfu } = request.body

    const loadPilotes = new ReportePilotesService();

    const pilotes = await loadPilotes.showfilter(fim_perfu);

    return response.json(pilotes);

  }
}






