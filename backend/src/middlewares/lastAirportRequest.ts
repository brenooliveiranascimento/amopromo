import { Request, Response, NextFunction } from 'express'
import { IAirports } from '../interfaces/airports';
import AirportModel from '../database/models/AirportModel';
import LastAirportRequest from "../database/models/LastAirportRequestModel";
import { airportApiConnection, baseHeader } from '../utils/airportConnection';
import AirportCoordinate from '../database/models/AirportCoordinateModel';

const DAY_IN_MILISECONDS = 8640000000

const updateAirportsData = async () => {
  const { data }: any = await airportApiConnection.get('/', baseHeader);
    Promise.all(Object.keys(data).map( async (currAirport: string) => {
      const { city, iata, lat, lon, state }: IAirports = data[currAirport];
      const airport = await AirportModel.findOne({where: { iata }});
      if(!airport) return createAirportData();
      await AirportModel.update(
        { iata, city, state, active: true, statusMessage: null},
        { where: { id: airport?.id } }
        );

      await AirportCoordinate.update(
        {lat, lon },
        { where: { airportId: airport?.id } }
        );
    }))
}

const createAirportData = async () => {
  const { data }: any = await airportApiConnection.get('/', baseHeader);
    Promise.all(Object.keys(data).map( async (currAirport: string) => {
      const { city, iata, lat, lon, state }: IAirports = data[currAirport];

      const airport = await AirportModel.create(
        { iata, city, state, active: true, statusMessage: 'Active!'}
        );

      await AirportCoordinate.create(
        {lat, lon, airportId: airport.id });
    }))
}

export const lastRequest = async (_req: Request, _res: Response, next: NextFunction) => {
  const [lastUpdateDate] = await LastAirportRequest.findAll();

  if(!lastUpdateDate) {
    await LastAirportRequest.create(
      { lastUpdate: JSON.stringify(Date.now()), id: 1 });
    await createAirportData();
    return next();
  }
  if(Date.now() - Number(lastUpdateDate.lastUpdate) >= DAY_IN_MILISECONDS ) {
    await LastAirportRequest.update(
      { lastUpdate: JSON.stringify(Date.now()) },
      { where: { id: lastUpdateDate.id } });

    updateAirportsData();
   return next()
  }
  next()
}
