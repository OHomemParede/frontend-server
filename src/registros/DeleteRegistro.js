import React, { useState } from "react"


import API from "../utils/API"

export default function DeleteRegistro(props) {
  const { myRegistros, setMyRegistros } = props
  const [registro, setRegistro] = useState('')

  const delete_registro = async (e) => {
    e.preventDefault();
    try {
      await API.delete(`/api/registro/delete/${registro}`)

      const newRegistros = [...myRegistros]
      let index = 0;
      for (let i = 0; i < newRegistros.length; i++) {
        if (newRegistros[i].idregistro == registro) {
          index = i
          break
        }
      }
      newRegistros.splice(index, 1)

      setMyRegistros(newRegistros)
    }
    catch (err) {
      alert(err);
    }
  }
  return (
    <div>
      <h3>Delete</h3>
      <label> Registro: </label>
      <select onChange={e => setRegistro(e.target.value)}>
        <option value="" selected disabled>Selecione</option>
        {
          myRegistros.map(item => {
            return (
              <option key={item.idregistro} value={item.idregistro}>
                {item.idregistro}
              </option>
            )
          })
        }
      </select>
      <button onClick={delete_registro} >Deletar Registro</button>
    </div>
  )
}