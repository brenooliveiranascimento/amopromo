import CustomError from "../utils/StatusError";
import AirportModel from "../database/models/AirportModel";
import { ErrorMap } from "../utils/errorMap";

export default class AirportsService {
  constructor(
    private airportModel = AirportModel) {}

  async handleAirportStatus(id: number, currStatus: boolean):Promise<void> {
    try {
      await this.airportModel.update(
        { active: currStatus},
        { where: { id } })
    } catch(e: any) { throw new CustomError(
      ErrorMap.SQL_CONNECTION_ERROR, 500)};
  };

  async getAll(): Promise<AirportModel[]> {
    const airports = await this.airportModel.findAll();
    return airports;
  }

  async getByIata(iata: string): Promise<AirportModel> {
    try {
      const airport = await this.airportModel.findOne({ where: { iata } });
      return airport as AirportModel;
    } catch(e: any) { throw new CustomError(
      ErrorMap.SQL_CONNECTION_ERROR, 500)};
  }
};
