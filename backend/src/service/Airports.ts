import LastAirportRequest from "../database/models/LastAirportRequestModel";

export default class AirportsService {
  constructor(private lastAirportRequest = LastAirportRequest) {}
  async createCache() {
    
  };
};
