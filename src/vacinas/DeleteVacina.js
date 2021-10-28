import React, { useState } from "react";

import API from "../utils/API";


export default function DeleteVacina(props) {
  const { myVacinas, setMyVacinas } = props
  const [idVacina, setIdVacina] = useState('')


  const delete_vacina = async (e) => {
    e.preventDefault();
    try {
      await API.delete(`/api/vacina/delete/${idVacina}`)

      const newVacinas = [...myVacinas]
      let index = 0;
      for (let i = 0; i < newVacinas.length; i++) {
        if (newVacinas[i].idvacina == idVacina) {
          index = i
          break
        }
      }

      newVacinas.splice(index, 1)
      setMyVacinas(newVacinas)
    }
    catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h3>Deletar Vacina</h3>
      <label> ID Vacina: </label>
      <select onChange={e => setIdVacina(e.target.value)}>
        <option value="" selected disabled>Selecione</option>
        {
          myVacinas.map(item => {
            return (
              <option key={item.idvacina} value={item.idvacina}>
                {item.idvacina}
              </option>
            )
          })
        }
      </select>
       <button onClick={delete_vacina}>Deletar</button>
    </div>
  )


}