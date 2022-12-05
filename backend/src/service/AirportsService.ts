import CustomError from "../utils/StatusError";
import AirportModel from "../database/models/AirportModel";

export default class AirportsService {
  constructor(
    private airportModel = AirportModel) {}

  async handleAirportStatus(id: number, currStatus: boolean):Promise<void> {
    try {
      await this.airportModel.update(
        { active: currStatus},
        { where: { id } })
    } catch(e: any) { throw new CustomError(e.message, 500) }
  };

  async getAll(): Promise<AirportModel[]> {
    const airports = await this.airportModel.findAll();
    return airports;
  }
};
