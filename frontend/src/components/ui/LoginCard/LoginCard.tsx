import React, { useState } from "react";
import { serviceConnection } from "../../../service/apiConnection";
import { useHistory } from 'react-router-dom'
import './style.css'

export default function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const autentication = async () => {
    try{
      const { data } = await serviceConnection.post('/login', {
        email,
        password
      });
      localStorage.setItem('AMOPROMO_TOKEN', JSON.stringify(data.token))
      history.push('/home');
    } catch(e: any) { alert(e.response.data.message) }
  }
  return(
    <section className="login_card_container">
      <h1>LoginPage</h1>
      <input
        onChange={({target}) => setEmail(target.value)}
        value={email}
        placeholder="email"
      />
      <input
        onChange={({target}) => setPassword(target.value)}
        placeholder="password"
      />
      <button onClick={autentication}>Entrar</button>
    </section>
  )
}
