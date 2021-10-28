import React, { useEffect, useState } from "react";

import API from "../utils/API";
import './style.css'


// ================== Componentes ==================+
import CreateRegistro from "./CreateRegistro";
import UpdateRegistro from './UpdateRegistro'
import DeleteRegistro from './DeleteRegistro'
import ShowTable from './ShowTable'
// =================================================+



// ================== Registro Page ==================
export default function RegistroPage() {
  const [myRegistros, setMyRegistros] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [myVacinas, setMyVacinas] = useState([])


  // ================== useEffect ==================
  useEffect(() => {
    API.get('/api/registro/lista').then(response => {
      const dados = response.data.Registros;
      setMyRegistros(dados);
    }).catch((err) => alert(err))

    API.get('/api/vacina/lista').then(response => {
      const dados = response.data.Vacinas;
      setMyVacinas(dados);
    }).catch((err) => alert(err))

    setIsLoading(false);
  }, []);


  return (
    <>
      <CreateRegistro
        myRegistros={myRegistros}
        setMyRegistros={setMyRegistros}
        myVacinas={myVacinas}
      />

      <UpdateRegistro
        myRegistros={myRegistros}
        setMyRegistros={setMyRegistros}
        myVacinas={myVacinas}
      />

      <DeleteRegistro
        myRegistros={myRegistros}
        setMyRegistros={setMyRegistros}
      />

      <ShowTable
        isLoading={isLoading}
        myRegistros={myRegistros}
      />
    </>
  )
}
