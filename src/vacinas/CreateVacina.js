import React, { useState } from "react";

import API from "../utils/API";


export default function CreateVacina(props) {
  const { myVacinas, setMyVacinas } = props
  const [newVacinaNome, setNewVacinaNome] = useState()

  const create_vacina = async (e) => {
    e.preventDefault();
    try {
      const resp = await API.post('/api/vacina/create', { nome: newVacinaNome })
      const { idvacina, nome } = resp.data
      setMyVacinas([...myVacinas, { idvacina, nome }])
    }
    catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h3>Cadastrar Vacina</h3>
      <input placeholder="Nome da Vacina" value={newVacinaNome} onChange={(e) => setNewVacinaNome(e.target.value)} />
      <button onClick={create_vacina}>Cadastrar</button>
    </div>
  )

}