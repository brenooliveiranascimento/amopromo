import React from 'react'
import { IAirport } from '../../../interfaces/airports'

export default function AirportCard(airport: IAirport) {
  const { statusMessage, city, iata, state } = airport;
  return (
    <section>
      <h1>{iata}</h1>
      <article>
        <span>{city}</span>
        <span>{state}</span>
        <span>{statusMessage}</span>
      </article>
    </section>
  )
}
