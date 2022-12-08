export interface IAirport {
  id: number;
  iata: string;
  city: string;
  state: string;
  statusMessage: string;
  active: boolean;
}