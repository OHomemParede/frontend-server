import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

import API from "../utils/API";

export default function SingUp() {
  const [mail, setMail] = useState("");
  const [senha, setSenha] = useState("");
  const history = useHistory()

  const cadastrar = async (e)=>{
    e.preventDefault();
    try {
      await API.post("api/usuario/create", { mail, senha });
      history.push('/');
    }
    catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Cadastro</h1>
      <div>
        <label>Email</label>
        <input placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
      </div>
      <div>
        <label>Senha</label>
        <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </div>
      <div>
        <button onClick={(e) => cadastrar(e)}>Cadastrar</button>
      </div>
    </div>
  )
}