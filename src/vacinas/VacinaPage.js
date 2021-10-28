import React, { useEffect, useState } from "react";

import API from "../utils/API";



// ================== Componentes ==================+
import CreateVacina from './CreateVacina'
import UpdateVacina from './UpdateVacina'
import DeleteVacina from './DeleteVacina'
import ShowVacinas from './ShowVacinas'
// =================================================+


// ================== Vacina Page ==================
export default function VacinaPage() {
  const [myVacinas, setMyVacinas] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  // ================== useEffect ==================
  useEffect(() => {
    API.get('/api/vacina/lista').then(response => {
      const dados = response.data.Vacinas;
      setMyVacinas(dados);
    }).catch((err) => alert(err))

    setIsLoading(false);
  }, [])

  return (
    <>
      <CreateVacina
        myVacinas={myVacinas}
        setMyVacinas={setMyVacinas}
      />

      <UpdateVacina
        myVacinas={myVacinas}
        setMyVacinas={setMyVacinas}
      />

      <DeleteVacina
        myVacinas={myVacinas}
        setMyVacinas={setMyVacinas}
      />

      <ShowVacinas
        myVacinas={myVacinas}
        isLoading={isLoading}
      />

    </>
  )
}