import { Request, Response } from 'express'

interface IAirportService {
  handleAirportStatus: (id: number, currStatus: boolean) => Promise<void>
}

export default class AirportController {
  declare _airportService: IAirportService;
  constructor(AirportService: IAirportService) { this._airportService = AirportService }

  async handleStatus(req: Request, res: Response) {
    const { id, currStatus } = req.params;

    await this._airportService.handleAirportStatus(Number(id), JSON.parse(currStatus));
    res.status(201).json({ message: 'airport status updated with success!!' })
  }

}