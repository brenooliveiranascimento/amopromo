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

  const updateStatus = (index: number) => {
    const updatedAirportList: IAirport[] = [ ...airports ];
    updatedAirportList[index].active = !updatedAirportList[index].active;
    setAirports(updatedAirportList);
  }

  useEffect(() => {
    requestAirports();
  }, []);

  return (
    <main className='container'>
      <section className='home_container'>
        { airports && airports.map((currAirport: IAirport, index) =>
          <AirportCard
          index={index}
          updateStatus={(id: number) => updateStatus(id)}
          key={currAirport.id}
          airport={currAirport}
          />)}
      </section>
    </main>
  )
}
