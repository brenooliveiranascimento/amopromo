import { Request, Response, NextFunction } from 'express'
import { IAirports } from '../interfaces/airports';
import AirportModel from '../database/models/AirportModel';
import LastAirportRequest from "../database/models/LastAirportRequestModel";
import { airportApiConnection, baseHeader } from '../utils/airportConnection';
import AirportCoordinate from '../database/models/AirportCoordinateModel';

const DAY_IN_MILISECONDS = 8640000000

const updateAirportsData = async () => {
  const { data }: any = await airportApiConnection.get('/', baseHeader);

  await AirportModel.afterBulkDestroy(() => {
    Promise.all(Object.keys(data)
      .map( async (currAirport: string) => {
      const { city, iata, lat, lon, state }: IAirports = data[currAirport];
      const insertAirport = await AirportModel.create({
        iata, city, state, active: true
      });

      await AirportCoordinate.create({
        lat, lon, airportId: insertAirport.id
      });
    }))
  })
}

export const lastRequest = async (_req: Request, _res: Response, next: NextFunction) => {
  const [{ lastUpdate, id }] = await LastAirportRequest.findAll();

  if(Date.now() - Number(lastUpdate) >= DAY_IN_MILISECONDS ) {

    await LastAirportRequest.update(
      { lastUpdate: JSON.stringify(Date.now()) },
      { where: { id } });

    updateAirportsData();
   return next()
  }
  next()
}
