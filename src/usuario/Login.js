import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom'


import API from '../utils/API'
import MainContext from "../utils/MainContext";

export default function Login() {
  const [mail, setMail] = useState("");
  const [senha, setSenha] = useState("");
  const { setLoggedIn, setToken, setIsAdmin } = useContext(MainContext);
  const history = useHistory()

  const logar = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("api/usuario/login", { mail, senha });
      const token = response.data.token
      localStorage.setItem("@token", JSON.stringify(token));
      API.defaults.headers.Authorization = `Bearer ${token}`;
      setToken(token)
      setLoggedIn(true)

    
      if(response.data.perfil == 'admin'){
        setIsAdmin(true)
      }
      history.push('/user')
    }
    catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Email</label>
        <input placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
      </div>
      <div>
        <label>Senha</label>
        <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </div>
      <div>
        <button onClick={(e) => logar(e)}>Logar</button>
      </div>
    </div>
  )
}
