import { Request, Response, NextFunction } from 'express'
import { IAirports } from '../interfaces/airports';
import AirportModel from '../database/models/AirportModel';
import LastAirportRequest from "../database/models/LastAirportRequestModel";
import { airportApiConnection, baseHeader } from '../utils/airportConnection';
import AirportCoordinate from '../database/models/AirportCoordinateModel';

export const lastRequest = async (req: Request, res: Response, next: NextFunction) => {
  const [{ last_update, id }]: LastAirportRequest[] = await LastAirportRequest.findAll();

  if(Number(last_update) - Date.now() <= 8.640000000 ) {
    const { data }: any = await airportApiConnection.get('/', baseHeader);
    await LastAirportRequest.update(
      { last_update: JSON.stringify(Date.now()) },
      { where: { id } });
    await AirportModel.afterBulkDestroy(() => {
      const updateAirports = Promise.all(Object.keys(data).map( async (currAirport: string) => {
        const { city, iata, lat, lon, state }: IAirports = data[currAirport];

        const insertAirport = await AirportModel.create({
          iata, city, state, active: true
        });

        await AirportCoordinate.create({
          lat, lon, airportId: insertAirport.id
        });
      }))
    })
    next()
  }
  next()
}
