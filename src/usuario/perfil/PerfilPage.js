import React, { useContext, useState, useEffect } from "react";

import API from "../../utils/API";
import MainContext from "../../utils/MainContext";


// ================== Componentes ==================+
import SeuPerfil from "./SeuPerfil";
import ShowUsers from './ShowUsers'
import UpdatePerfil from './UpdatePerfil'
// =================================================+



// ================== Perfil ==================
export default function Perfil() {
  const [myUsers, setMyUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { isAdmin } = useContext(MainContext)


  // ================== useEffect ==================
  useEffect(() => {
    if (isAdmin) {
      API.get('/api/usuario/lista').then(response => {
        const dados = response.data;
        setMyUsers(dados);
      }).catch((err) => alert(err))

      setIsLoading(false);
    }
  }, []);


  // ================== Admin Side Perfil ==================
  function AdminSidePerfil() {
    if (isAdmin) {
      return (
        <>
          <ShowUsers
            isLoading={isLoading}
            myUsers={myUsers}
          />

          <UpdatePerfil
            myUsers={myUsers}
            setMyUsers={setMyUsers}
          />
        </>
      )
    }
    return <></>
  }
  return (
    <>
      <SeuPerfil
        myUsers={myUsers}
        setMyUsers={setMyUsers}
      />
      <AdminSidePerfil />
    </>
  )
}
