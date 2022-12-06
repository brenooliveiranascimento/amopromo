import { Request, Response } from 'express';
import TravelService from "../service/TravelsService";

interface ITravelInterface extends TravelService {
  mountTrave: (depure: string, arrival: string, date: Date | string) => void;
}

export class TravelController {
  declare _travelService: ITravelInterface
  constructor(travelService: ITravelInterface) {this._travelService = travelService}

  async mountTravel(req: Request, res: Response) {
    const getTravel = await this._travelService.mountTrave('POA', 'MAO', '2022-06-12')
  }

}