import { Request, Response } from 'express';
import { IMountTravelParams } from '../interfaces/TravelInterfaces';
import { IAirportService } from './AirportsController';

interface ITravelInterface {
  mountTravel: (travelParams: IMountTravelParams) => Promise<void>;
}

export default class TravelController {
  declare _travelService: ITravelInterface;
  constructor(travelService: ITravelInterface) {this._travelService = travelService}

  async mountTravel(req: Request, res: Response) {
    const { 
      depure, arrival, exitDate, returnDate
    } = req.params;
    const getTravel = await this._travelService.mountTravel({
      depure, arrival, exitDate, returnDate
    });
    res.status(200).json(getTravel);
  }

}