import React from 'react'
import { IAirport } from '../../../interfaces/airports'
import './styles.css';
interface IAiportProp {
  airport: IAirport;
}

export default function AirportCard({airport}: IAiportProp) {
  const { statusMessage, city, iata, state } = airport;
  console.log(city)
  return (
    <section className='card'>
      <h1>{iata}</h1>
      <article>
        <span>{city}</span>
        <span>{state}</span>
        <span>{statusMessage}</span>
      </article>
    </section>
  )
}
