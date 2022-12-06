import AirportModel from "../database/models/AirportModel";
import { mockAirlineApi } from "../utils/mockAirlineConnection";
import AirportsService from "./AirportsService";

export default class TravelService extends AirportsService {
  private async getTravel(depure: string, arrival: string, date: Date | string) {
    const travel = await mockAirlineApi.get(`/${depure}/${arrival}/${date}`);
    return travel;
  }

  private async checkAirportsExist(airports: string[]):Promise<boolean> {
    const getAirports = await Promise
      .all(airports.map(async(currAirport: string) => await this.getByIata(currAirport)));
    const validate = getAirports.every((currAirport: AirportModel) => currAirport)
    return validate
  }

  private async mountTravel(depure: string, arrival: string, date: Date | string) {
    const travel = await this.getTravel;
    console.log(travel)
  }
}