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
  const newPrice = { ...currOption.price, fees, total }
  return newPrice
}

export function haversineForm(coordinates: any, travelTime: number, price: number) {
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

const sumOptionsValues = (exitTravel: any, returnTravel:any) => {
  return exitTravel.options.map((currTravel: any, index: number) => {
    const { total_price: currTravel_total, aircraft: currAirCtaft } = currTravel;
    const some = returnTravel.options.map((currReturnTravel: any) => {
      const { total_price, aircraft} = currReturnTravel;
      const total_value = Number((currTravel_total + total_price).toFixed(2));
      return { total_value, exit_whith: currAirCtaft, return_with: aircraft };
    });
    return { [`${currAirCtaft.manufacturer}:${currAirCtaft.model}`]: some };
  })
}
 
export const combinations = (travels: any) => {
  const exitTravel = travels[0];
  const returnTravel = travels[1];
  const { from, to, currency, options: exitOptions } = exitTravel;
  const { options: returnOprions } = returnTravel;
  const { departure_time: exit_date } = exitOptions[0];
  const { departure_time: return_date } = returnOprions[0];

  const options = sumOptionsValues(exitTravel, returnTravel);

  const formatOptions = options.reduce((acc: any, currAirport: any) => {
    acc = { ...acc, ...currAirport };
    return acc
  }, {});

  return {
    type: 'round trip',
    from,
    to,
    currency,
    dates: { exit_date, return_date },
    options: formatOptions,
    individual_metrics: [ ...exitOptions, ...returnOprions ]
  }
}
