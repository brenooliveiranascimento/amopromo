import LastAirportRequest from "src/database/models/LastAirportRequestModel";

export default class AirportsService {
  constructor(private lastAirportRequest = LastAirportRequest) {}
  async createCache() {
    
  };
};
