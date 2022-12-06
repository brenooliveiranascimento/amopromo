import { IOptions } from "../interfaces/Travel";

export const calculateDiference = (init: Date | string, end: Date | string) => {
  const depure = new Date(init);
  const arrival = new Date(end);
  let difference = new Date( arrival.getTime() - depure.getTime() );
  const totalHour = (difference.getUTCHours() * 60) + difference.getUTCMinutes()
  return Number((totalHour / 60).toFixed(3));
}

export const mountPrice = (currOption: IOptions) => {
  const calculateFees = Number((currOption.price.fare / 100) * 10);
  const fees = Number((calculateFees > 40 ? calculateFees : 40).toFixed(2));
  const total = Number((fees + currOption.price.fare).toFixed(2));
  const newPrice = {
    ...currOption.price,
    fees,
    total
  }
  return newPrice
}

export function haversine(coordinates: any, travelTime: number, price: number) {
  const { lat1, lon1, lat2, lon2 } =  coordinates;
    let dLat = (lat2 - lat1) * Math.PI / 180.0;
    let dLon = (lon2 - lon1) * Math.PI / 180.0;
       
    let a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) *
      Math.cos(lat1) *Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));

    const km = Number((rad * c).toFixed(2));

    const meta = {
      range: km,
      cruise_speed_kmh: Number((km / travelTime).toFixed(2)),
      cost_per_km: Number((km / price).toFixed(2)),
    }
    return meta;
     
}
