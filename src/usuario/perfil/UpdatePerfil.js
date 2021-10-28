import React, { useState } from "react"
import API from "../../utils/API"


// ================== Update Perfil ==================
export default function UpdatePerfil(props) {
  const { myUsers, setMyUsers } = props

  const [idUsuario, setIdUsuario] = useState('')
  const [updatePerfil, setUpdatePerfil] = useState('')


  // ================== update perfil ==================
  const update_perfil = async (e) => {
    e.preventDefault();
    try {
      await API.put("/api/usuario/update/perfil", { idusuario: idUsuario, perfil: updatePerfil })
      const newUsers = myUsers.map(item => {
        if (item.idusuario == idUsuario) {
          return { ...item, perfil: updatePerfil }
        }
        return item
      })
      setMyUsers(newUsers)
    }
    catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h3>Alterar Perfil</h3>
      <label> ID Usuario: </label>
      <select onChange={e => setIdUsuario(e.target.value)}>
        <option value="" selected disabled>Selecione</option>
        {
          myUsers.map(item => {
            return (
              <option key={item.idusuario} value={item.idusuario}>
                {item.idusuario}
              </option>
            )
          })
        }
      </select>

      <select onChange={e => setUpdatePerfil(e.target.value)}>
        <option value="" selected disabled>Selecione</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={update_perfil} >Alterar Data</button>
    </div>
  )
}