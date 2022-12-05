export interface IAirports {
  iata: string;
  city: string;
  lat: number;
  lon: number;
  state: string;
  active?: boolean
}