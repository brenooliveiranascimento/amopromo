import { IOptions } from "../interfaces/Travel";

export const calculateDiference = (init: Date | string, end: Date | string) => {
  const depure = new Date(init);
  const arrival = new Date(end);
  let difference = new Date( arrival.getTime() - depure.getTime() );
  const totalHour = (difference.getUTCHours() * 60) + difference.getUTCMinutes()
  return (totalHour / 60).toFixed(3);
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
