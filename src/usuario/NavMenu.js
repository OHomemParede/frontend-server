import React from "react"

export default function NavMenu(props) {

  return (
    <div>
      <button onClick={() => props.menu(0)}>Perfil</button>
      <button onClick={() => props.menu(1)}>Registros</button>
      {props.isAdmin ? <button onClick={() => props.menu(3)}>Vacinas</button> : <button hidden>null</button>}
      <button onClick={() => props.menu(2)}>Logout</button>
      
    </div>
  )
}