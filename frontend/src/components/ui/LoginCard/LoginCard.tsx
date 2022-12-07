import React from "react";
import './style.css'

export default function LoginCard() {
  return(
    <section className="login_card_container">
      <h1>LoginPage</h1>
      <input placeholder="email" />
      <input placeholder="password" />
      <button>Entrar</button>
    </section>
  )
}
