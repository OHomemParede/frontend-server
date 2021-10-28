import React, { useState, useContext } from "react"

import API from "../utils/API"
import MainContext from "../utils/MainContext";

// ================== UpdateRegistro ==================
export default function UpdateRegistro(props) {
  const { myRegistros, setMyRegistros, myVacinas } = props

  const [usuarioInfo, setUsuarioInfo] = useState()
  const [registro, setRegistro] = useState('')
  const [updateData, setUpdateData] = useState('')
  const [updateVacina, setUpdateVacina] = useState([])
  const { isAdmin } = useContext(MainContext)

  // ================== update data ==================
  const update_data = async (e) => {
    e.preventDefault();
    try {
      await API.put("/api/registro/update/data", { idregistro: registro, data: updateData, idusuario: usuarioInfo })
      const newRegistros = myRegistros.map(item => {
        if (item.idregistro == registro) {
          return { ...item, data: updateData }
        }
        return item
      })
      setMyRegistros(newRegistros)
    }
    catch (err) {
      alert(err);
    }
  }


  // ================== update vacina ==================
  const update_vacina = async (e) => {
    e.preventDefault();
    try {
      await API.put("/api/registro/update/idvacina", { idregistro: registro, idvacina: updateVacina[0], idusuario: usuarioInfo })
      const newRegistros = myRegistros.map(item => {
        if (item.idregistro == registro) {
          return { ...item, idvacina: updateVacina[0], nomeVacina: updateVacina[1] }
        }
        return item
      })
      setMyRegistros(newRegistros)
    }
    catch (err) {
      alert(err);
    }
  }


  return (
    <div>
      <h3>Alterar</h3>
      {
        isAdmin ?
          <input placeholder="id usuario" value={usuarioInfo} onChange={(e) => setUsuarioInfo(e.target.value)} />
          : <></>
      }
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
      <br />

      <input value={updateData} onChange={(e) => setUpdateData(e.target.value)} type="date" />
      <button onClick={update_data} >Alterar Data</button>
      <br />

      <label> Vacina: </label>
      <select onChange={e => setUpdateVacina(e.target.value.split(','))}>
        <option value="" selected disabled>Selecione</option>
        {
          myVacinas.map(item => {
            return (
              <option key={item.idvacina} value={[item.idvacina, item.nome]}>
                {item.nome}
              </option>
            )
          })
        }
      </select>
      <button onClick={update_vacina} >Alterar Vacina</button>
    </div>
  )
}