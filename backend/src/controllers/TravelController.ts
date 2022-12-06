import { Request, Response } from 'express';
import { IMountTravelParams } from '../interfaces/TravelInterfaces';
import { IAirportService } from './AirportsController';

interface ITravelInterface {
  mountUnitTravel: (travelParams: IMountTravelParams) => Promise<void>;
  mountMultiTravel: (travelParams: IMountTravelParams) => Promise<void>;
}

export default class TravelController {
  declare _travelService: ITravelInterface;
  constructor(travelService: ITravelInterface) {this._travelService = travelService}

  async mountUnitTravel(req: Request, res: Response) {
    const { 
      depure, arrival, exitDate
    } = req.params;
    const getTravel = await this._travelService.mountUnitTravel({
      depure, arrival, exitDate, returnDate: new Date()
    });
    res.status(200).json(getTravel);
  }

  async mountmultiTravel(req: Request, res: Response) {
    const { 
      depure, arrival, exitDate, returnDate
    } = req.params;
    const getTravel = await this._travelService.mountMultiTravel({
      depure, arrival, exitDate, returnDate
    });
    res.status(200).json(getTravel);
  }

}