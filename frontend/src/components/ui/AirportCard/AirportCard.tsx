import React from 'react'
import { IAirport } from '../../../interfaces/airports'
import { serviceConnection } from '../../../service/apiConnection';
import './styles.css';
interface IAiportProp {
  airport: IAirport;
  updateStatus: (index: number) => void;
  index: number
}

export default function AirportCard({airport, updateStatus, index}: IAiportProp) {
  const { city, iata, state, id, active } = airport;
  const updateAirportStatus = async () => {
    try {
      await serviceConnection.put(`/airports/${id}/${!active}`, null, {
        headers: { 'Authorization': localStorage.getItem('AMOPROMO_TOKEN')}
      })
      updateStatus(index);
    } catch(e: any) { alert(e.response.data.message) };
  }

  return (
    <section className='card'>
      <h1>{iata}</h1>
      <article>
        <span>{city}</span>
        <span>{state}</span>
        <button onClick={updateAirportStatus}>{active ? 'active!' : 'inactive!'}</button>
      </article>
    </section>
  )
}
