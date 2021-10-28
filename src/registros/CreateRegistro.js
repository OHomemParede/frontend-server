import React, { useState, useContext } from "react";

import API from "../utils/API";
import MainContext from "../utils/MainContext";

// ================== CreateRegistro ==================
export default function CreateRegistro(props) {
  const [dataRelativa, setDataRelativa] = useState('')
  const [vacinaInfo, setVacinaInfo] = useState([])
  const [usuarioInfo, setUsuarioInfo] = useState('')
  const { isAdmin } = useContext(MainContext)


  const { myRegistros, setMyRegistros, myVacinas } = props

  const makeRegistro = async (e) => {
    e.preventDefault();
    try {
      const bodyReq = { idvacina: vacinaInfo[0], data: dataRelativa, idusuario: usuarioInfo }
      const resp = await API.post("/api/registro/create", bodyReq)
      const { idregistro, idvacina, data, idusuario } = resp.data
      setMyRegistros([...myRegistros, { idregistro, idvacina, data, nomeVacina: vacinaInfo[1], idusuario }])
    }
    catch (err) {
      alert(err);
    }
  }
  return (
    <div>
      <h3>Cadastro</h3>
      {
        isAdmin ?
          <input placeholder="id usuario" value={usuarioInfo} onChange={(e) => setUsuarioInfo(e.target.value)} />
          : <></>
      }
      <input value={dataRelativa} onChange={(e) => setDataRelativa(e.target.value)} type="date" />
      <label> Vacina: </label>
      <select onChange={e => setVacinaInfo(e.target.value.split(','))}>
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
      <button onClick={(e) => makeRegistro(e)}>Cadastrar</button>
    </div>
  )
}