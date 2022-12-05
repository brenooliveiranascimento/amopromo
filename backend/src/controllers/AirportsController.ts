import { Request, Response } from 'express'
import AirportModel from '../database/models/AirportModel';

interface IAirportService {
  handleAirportStatus: (id: number, currStatus: boolean) => Promise<void>;
  getAll: () => Promise<AirportModel[]>;
  getByIata: (iata: string) => Promise<AirportModel>;
}

export default class AirportController {
  declare _airportService: IAirportService;
  constructor(AirportService: IAirportService) { this._airportService = AirportService }

  async handleStatus(req: Request, res: Response) {
    const { id, currStatus } = req.params;

    await this._airportService.handleAirportStatus(Number(id), JSON.parse(currStatus));
    return res.status(201).json({ message: 'airport status updated with success!!' });
  }

  async getAll(_req: Request, res: Response) {
    const airports = await this._airportService.getAll();
    return res.status(201).json({ message: airports });
  }

  async getByIata(req: Request, res: Response) {
    const { iata } = req.params;
    const airport = await this._airportService.getByIata(iata);
    return res.status(200).json({ message: airport });
  }

}