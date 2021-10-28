import React, { useState, useContext } from 'react'

import MainContext from '../utils/MainContext'


// ================== Componentes ==================+
import NavMenu from './NavMenu'
import PerfilPage from './perfil/PerfilPage'
import RegistroPage from '../registros/RegistroPage'
import Logout from './Logout'
import VacinaPage from '../vacinas/VacinaPage'
// =================================================+


// ================== Usuario Page ==================
export default function UsuarioPage() {
  const [optionMenu, setOptionMenu] = useState(0)
  const { isAdmin } = useContext(MainContext)

  const MenuRender = ()=>{
    const menus = {
      0: <PerfilPage />,
      1: <RegistroPage />,
      2: <Logout />,
      3: isAdmin ? <VacinaPage /> : <></> 
    }
    return menus[optionMenu]
  }
  return (
    <>
      <NavMenu menu={setOptionMenu} isAdmin={isAdmin}/>
      <MenuRender />
    </>
  )
}