interface IFrom {
  iata: string
  city: string
  lat: number
  lon: number
  state: string
};

interface ITo {
  iata: string
  city: string
  lat: number
  lon: number
  state: string
};

interface ISumary {
  departure_date: string | Date;
  from: IFrom;
  to: ITo;
  currency: string;
};

interface IIcarft {
  model: string;
  manufacturer: string;
};

interface IPrice {
  fare: number;
  fees: number;
  total: number;
};

interface IMeta {
  rage: number;
  cruise_speed_kmh: number;
  cust_per_km: number;
};

interface IOptions {
  departure_time: Date | string;
  arrival_time:  Date | string;
  price: IPrice;
  aircraft: IIcarft;
  meta: IMeta;
}

export interface ITravel {
 type: string;
 sumary: ISumary;
 option: IOptions[];
}