import React from "react";

export default function ShowUsers(props) {
  const { myUsers, isLoading } = props


  if (isLoading)
    return <p>Carregando...</p>

  const tablezada = myUsers.map(item => {
    return (
      <tr key={item.idusuario}>
        <td>{item.idusuario}</td>
        <td>{item.mail}</td>
        <td>{item.perfil}</td>
      </tr>
    )
  })
  return (

    <table>
      <thead>
        <tr>
          <th>ID usuario</th>
          <th>Email</th>
          <th>Perfil</th>
        </tr>
      </thead>
      <tbody>
        {tablezada}
      </tbody>
    </table>
  )

}