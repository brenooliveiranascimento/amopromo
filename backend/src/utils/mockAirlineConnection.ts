import axios from "axios"
import { ITravel } from "../interfaces/Travel";
import { IMountTravelParams } from "../interfaces/TravelInterfaces";
import { baseHeader } from "./airportConnection";

export const mockAirlineApi = axios.create({
  baseURL: 'http://stub.2xt.com.br/air/search/pzrvlDwoCwlzrWJmOzviqvOWtm4dkvuc'
})

export const requestTravel = async (travelParams: IMountTravelParams, currDate: Date | string, index: number) => {
  const { arrival, depure } = travelParams;
  const { data } = await mockAirlineApi
    .get(`/${index ? arrival : depure}/${index ? depure : arrival}/${currDate}`, baseHeader);
  return data;
} 
