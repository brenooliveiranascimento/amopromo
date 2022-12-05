import AirportModel from "../database/models/AirportModel";

export default class AirportsService {
  constructor(
    private airportModel = AirportModel) {}

  async handleAirportStatus(id: number, currStatus: boolean):Promise<void> {
    await this.airportModel.update(
      { active: currStatus},
      { where: { id } }
    )
  };

  async createCache() {
    
  };
};
