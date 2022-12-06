import { baseHeader } from "../utils/airportConnection";
import AirportModel from "../database/models/AirportModel";
import { mockAirlineApi, requestTravel } from "../utils/mockAirlineConnection";
import AirportsService from "./AirportsService";
import { IMountTravelParams } from "../interfaces/TravelInterfaces";
import CustomError from "../utils/StatusError";
import { ErrorMap } from "../utils/errorMap";
import { IOptions, ITravel } from "../interfaces/Travel";
import { calculateDiference, haversine, mountPrice } from "../utils/travelOptionsUtils";

export default class TravelService {
  constructor(private airportsService = new AirportsService()) {}

  mountOptions(currTravel: ITravel) {
    const { options, summary } = currTravel;
    const { from, to } = summary;
    const newOption = options.map((currOption: IOptions) => {
      const price = mountPrice(currOption);
      const travelTime = calculateDiference(currOption.departure_time, currOption.arrival_time)
      const meta = haversine({ lat1: from.lat, lon1: from.lon, lat2: to.lat, lon2: to.lon }, travelTime, price.total);
      return { ...currOption, price, meta }
    });
    return { ...currTravel, options: newOption };
  }

  private async getTravel(travelParams: IMountTravelParams) {
    const { exitDate, returnDate } = travelParams;

    const exitAndReturnDate = Promise.all([exitDate, returnDate]
      .map(async (currDate: Date | string, index: number) => {
      const data = await requestTravel(travelParams, currDate);
      if(!index) return { type: 'Exit', ...data };
      return { type: 'return', ...data };
    }))
    const mountOptions = await (await exitAndReturnDate)
      .map((currTravel: ITravel) => this.mountOptions(currTravel));
    return mountOptions;
  }

  private async checkAirportsExist(airports: string[]):Promise<boolean> {
    const getAirports = await Promise
      .all(airports.map(async(currAirport: string) => await this.airportsService.getByIata(currAirport)));

    const validate = getAirports.every((currAirport: AirportModel) => currAirport);

    if(validate) return true;
    throw new CustomError(ErrorMap.INVALID_AIRPORT, 404);
  }

  private async travelValidations(travelParams: IMountTravelParams): Promise<void> {
    const { arrival, depure, exitDate, returnDate } = travelParams;

    await this.checkAirportsExist([arrival, depure]);

    if(new Date(exitDate) > new Date(returnDate)) throw new CustomError(ErrorMap.RETURN_LESS, 404);
    if(new Date(exitDate) > new Date()) throw new CustomError(ErrorMap.EXIT_NOW, 404);
    if(arrival === depure) throw new CustomError(ErrorMap.EQUAL_DESTINATIONS, 404);
  }

  async mountTravel(travelParams: IMountTravelParams): Promise<any> {
    await this.travelValidations(travelParams);

    const travel = await this.getTravel(travelParams);

    return travel
  }
}