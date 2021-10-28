import React from "react";


export default function ShowVacinas(props) {
    const { myVacinas, isLoading } = props


    if (isLoading)
    return <p>Carregando...</p>

  const tablezada = myVacinas.map(item => {
    return (
      <tr key={item.idvacina}>
        <td>{item.idvacina}</td>
        <td>{item.nome}</td>
      </tr>
    )
  })
  return (
    <table>
      <thead>
        <tr>
          <th>ID Vacina</th>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        {tablezada}
      </tbody>
    </table>
  )
}