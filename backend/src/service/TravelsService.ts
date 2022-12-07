import { baseHeader } from "../utils/airportConnection";
import AirportModel from "../database/models/AirportModel";
import { mockAirlineApi, requestTravel } from "../utils/mockAirlineConnection";
import AirportsService from "./AirportsService";
import { IMountTravelParams } from "../interfaces/TravelInterfaces";
import CustomError from "../utils/StatusError";
import { ErrorMap } from "../utils/errorMap";
import { IOptions, ITravel } from "../interfaces/Travel";
import { calculateDiference, combinations, haversineForm, mountPrice } from "../utils/travelOptionsUtils";

export default class TravelService {
  constructor(private airportsService = new AirportsService()) {}

  mountOptions(currTravel: ITravel) {
    const { options, summary } = currTravel;
    const { from, to } = summary;
    const newOption = options.map((currOption: IOptions) => {
      const price = mountPrice(currOption);
      const travelTime = calculateDiference(currOption.departure_time, currOption.arrival_time)
      const meta = haversineForm({ lat1: from.lat, lon1: from.lon, lat2: to.lat, lon2: to.lon }, travelTime, price.total);
      return { ...currOption, price, meta }
    });
    return { ...currTravel, options: newOption };
  }

  private async getTravel(travelParams: IMountTravelParams, type: string) {
    const { exitDate, returnDate } = travelParams;

    const matches = type === 'unit' ? [exitDate] : [exitDate, returnDate];

    const exitAndReturnDate = Promise.all(matches
      .map(async (currDate: Date | string, index: number) => {
      const data = await requestTravel(travelParams, currDate, index);
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

  private async travelValidations(travelParams: IMountTravelParams, type: string): Promise<void> {
    const { arrival, depure, exitDate, returnDate } = travelParams;
    await this.checkAirportsExist([arrival, depure]);
    if(type !== 'unit') {
      if(new Date(exitDate) > new Date(returnDate)) throw new CustomError(ErrorMap.RETURN_LESS, 404);
    }
    if(new Date(exitDate) > new Date()) throw new CustomError(ErrorMap.EXIT_NOW, 404);
    if(arrival === depure) throw new CustomError(ErrorMap.EQUAL_DESTINATIONS, 404);
  }

  // private combinations(travels: any) {
  //   const exitTravel = travels[0];
  //   const returnTravel = travels[1];
  //   const { from, to, currency, options: exitOptions } = exitTravel;
  //   const { options: returnOprions } = returnTravel;
  //   const { departure_time: exit_date } = exitOptions[0];
  //   const { departure_time: return_date } = returnOprions[0];
  //   const options = exitTravel.options.map((currTravel: any, index: number) => {
  //     const { total_price: currTravel_total, aircraft: currAirCtaft } = currTravel;
  //     const some = returnTravel.options.map((currReturnTravel: any) => {
  //       const { total_price, aircraft} = currReturnTravel;
  //       const total_value = Number((currTravel_total + total_price).toFixed(2));
  //       return { total_value, return_with: aircraft, exit_whith: currAirCtaft };
  //     });
  //     return { [`${currAirCtaft.manufacturer}:${currAirCtaft.model}`]: some };
  //   });
  //   const format = options.reduce((acc: any, currAirport: any) => {
  //     acc = { ...acc, ...currAirport };
  //     console.log(acc);
  //     return acc
  //   }, {});
  //   return { from, to, currency, dates: { exit_date, return_date }, options: format }
  // }

  private formatData(travel: ITravel) {
    const { options: oldOptions, summary, type } = travel;
    const { from: oldFrom, to: oldTo, currency } = summary;

    const options = oldOptions.map((currOption: IOptions) => {
      const { aircraft, arrival_time, departure_time, meta, price } = currOption;
      const { range } = meta; const { total } = price;
      return {
        aircraft, distance: range, departure_time, arrival_time, total_price: total 
      };
    });

    const from = { city: oldFrom.city, iata:oldFrom.iata };
    const to = { city: oldTo.city, iata:oldTo.iata };
    return { type, from, to, currency, options };
  }

  async mountUnitTravel(travelParams: IMountTravelParams): Promise<any> {
    await this.travelValidations(travelParams, 'unit');

    const travel = await this.getTravel(travelParams, 'unit') as any;
    const formatData = this.formatData(travel[0])
    return formatData
  }

  async mountMultiTravel(travelParams: IMountTravelParams): Promise<any> {
    await this.travelValidations(travelParams, 'mult');

    const travel = await this.getTravel(travelParams, 'mult');
    const formatData = travel.map((currTravel: any) => this.formatData(currTravel))
    const calculaAllTravels = combinations(formatData);
    return calculaAllTravels
  }
}
