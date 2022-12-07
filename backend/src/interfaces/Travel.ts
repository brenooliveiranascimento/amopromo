export interface IFrom {
  iata: string
  city: string
  lat: number
  lon: number
  state: string
};

export interface ITo {
  iata: string
  city: string
  lat: number
  lon: number
  state: string
};

export interface ISumary {
  departure_date: string | Date;
  from: IFrom;
  to: ITo;
  currency: string;
};

export interface IIcarft {
  model: string;
  manufacturer: string;
};

export interface IPrice {
  fare: number;
  fees: number;
  total: number;
};

export interface IMeta {
  range: number;
  cruise_speed_kmh: number;
  cust_per_km: number;
};

export interface IOptions {
  departure_time: Date | string;
  arrival_time:  Date | string;
  price: IPrice;
  aircraft: IIcarft;
  meta: IMeta;
}

export interface ITravel {
 type?: string;
 summary: ISumary;
 options: IOptions[];
}