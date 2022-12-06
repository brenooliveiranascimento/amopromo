import { baseHeader } from "../utils/airportConnection";
import AirportModel from "../database/models/AirportModel";
import { mockAirlineApi } from "../utils/mockAirlineConnection";
import AirportsService from "./AirportsService";
import { IMountTravelParams } from "../interfaces/TravelInterfaces";
import CustomError from "../utils/StatusError";

export default class TravelService {
  constructor(private airportsService = new AirportsService()) {}
  private async getTravel(travelParams: IMountTravelParams) {
    const { arrival, depure, exitDate, returnDate } = travelParams;
    const exitAndReturnDate = Promise.all([exitDate, returnDate]
      .map(async (currDate: Date | string, index: number) => {
      const { data } = await mockAirlineApi.get(`/${arrival}/${depure}/${currDate}`, baseHeader);
      if(!index) {
        const mountData = { type: 'Exit', ...data }
        return mountData
      }
      const mountData = { type: 'return', ...data }
      return mountData
    }))
    return exitAndReturnDate;
  }

  private async checkAirportsExist(airports: string[]):Promise<boolean> {
    const getAirports = await Promise
      .all(airports.map(async(currAirport: string) => await this.airportsService.getByIata(currAirport)));
    const validate = getAirports.every((currAirport: AirportModel) => currAirport)
    if(validate) return true;
    throw new CustomError("Invalid Airport!", 404);
  }

  async mountTravel(travelParams: IMountTravelParams): Promise<any> {
    const { arrival, depure } = travelParams;
    await this.checkAirportsExist([arrival, depure]);
    const travel = await this.getTravel(travelParams);
    return travel
  }
}