import React, { useState } from "react";

import API from "../utils/API";

export default function UpdateVacina(props) {
  const { myVacinas, setMyVacinas } = props
  const [idVacina, setIdVacina] = useState('')
  const [newVacinaNome, setNewVacinaNome] = useState()

  const update_vacina = async (e) => {
    e.preventDefault();
    try {
      await API.put('/api/vacina/update/nome', { idvacina: idVacina, nome: newVacinaNome  })

      const newVacinas = myVacinas.map(item => {
        if (item.idvacina == idVacina) {
          return { ...item, nome: newVacinaNome }
        }
        return item
      })
      
      setMyVacinas(newVacinas)
    }
    catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h3>Atualizar o Nome da Vacina</h3>
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
      <input placeholder="Novo Nome da Vacina" value={newVacinaNome} onChange={(e) => setNewVacinaNome(e.target.value)} />
      <button onClick={update_vacina}>Atualizar</button>
    </div>
  )

}