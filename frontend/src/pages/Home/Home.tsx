import React, { useEffect, useState } from 'react'
import AirportCard from '../../components/ui/AirportCard/AirportCard';
import { IAirport } from '../../interfaces/airports';
import { serviceConnection } from '../../service/apiConnection';
import './styles.css';

export default function Home() {
  const [airports, setAirports] = useState<IAirport[]>([])

  const requestAirports = async () => {
    try {
      const { data } = await serviceConnection.get('/airports', {
        headers: { 'Authorization': localStorage.getItem('AMOPROMO_TOKEN')}
      })
      setAirports(data.message)
    } catch(e: any) { alert(e.response.data.message) };
  }

  useEffect(() => {
    requestAirports();
  }, []);

  return (
    <main className='main_container'>
      <section className='home_container'>
        { airports && airports.map((currAirport: IAirport) => <AirportCard
          key={currAirport.id}
          airport={currAirport}
          />) }
      </section>
    </main>
  )
}
