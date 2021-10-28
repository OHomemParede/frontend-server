import React, { useContext } from "react"

import MainContext from "../utils/MainContext"

// ================== ShowTable ==================
export default function ShowTable(props) {
  const { isLoading, myRegistros } = props
  const { isAdmin } = useContext(MainContext)

  if (isLoading)
    return <p>Carregando...</p>

  const tablezada = myRegistros.map(item => {
    return (
      <tr key={item.idregistro}>
        <td>{item.idregistro}</td>
        <td>{item.data}</td>
        <td>{item.nomeVacina}</td>
        {isAdmin ? <td>{item.idusuario}</td> : <></>}
      </tr>
    )
  })
  return (

    <table>
      <thead>
        <tr>
          <th>Registro</th>
          <th>Data</th>
          <th>Vacina</th>
          {isAdmin ? <th>Usuario</th> : <></>}
        </tr>
      </thead>
      <tbody>
        {tablezada}
      </tbody>
    </table>
  )
}