import { Request, Response } from 'express'
import { IGetAllAirports } from '../interfaces/AirportControllerResponse';
import AirportModel from '../database/models/AirportModel';
import { IAirports } from '../interfaces/airports';

interface IAirportService {
  handleAirportStatus: (id: number, currStatus: boolean) => Promise<void>;
  getAll: () => Promise<AirportModel[]>;
}

export default class AirportController {
  declare _airportService: IAirportService;
  constructor(AirportService: IAirportService) { this._airportService = AirportService }

  async handleStatus(req: Request, res: Response) {
    const { id, currStatus } = req.params;

    await this._airportService.handleAirportStatus(Number(id), JSON.parse(currStatus));
    return res.status(201).json({ message: 'airport status updated with success!!' })
  }

  async getAll(_req: Request, res: Response) {
    const airports = await this._airportService.getAll();
    return res.status(201).json({ message: airports });
  }

}