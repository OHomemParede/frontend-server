import React, { useState } from "react";

import API from "../../utils/API";

export default function SeuPerfil(props) {
  const [mail, setMail] = useState("");
  const [senha, setSenha] = useState("");
  const { myUsers, setMyUsers } = props

  const updateEmail = async (e) => {
    e.preventDefault();
    try {
      const resp = await API.put("/api/usuario/update/mail", { mail });
      const newUsers = myUsers.map(item=>{
        if(item.idusuario == resp.data.idusuario)
          return {
            idusuario: item.idusuario,
            mail,
            perfil: item.perfil
          }
        
        return {...item}
      })
      setMyUsers(newUsers)
    }
    catch (err) {
      alert(err);
    }
  }

  const updateSenha = async (e) => {
    e.preventDefault();
    try {
      await API.put("api/usuario/update/senha", { senha });
    }
    catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Seu Pefil</h1>
      <div>
        <input placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
        <button onClick={(e) => updateEmail(e)}>Update Email</button>
      </div>
      <div>
        <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button onClick={(e) => updateSenha(e)}>Update Senha</button>
      </div>
    </div>
  )
}
