import React, { useContext } from "react";
import { useHistory } from 'react-router-dom'

import API from "../utils/API";
import MainContext from "../utils/MainContext";

export default function Logout() {
  const history = useHistory()
  const { setLoggedIn, setToken, setIsAdmin } = useContext(MainContext);

  setToken('')
  localStorage.setItem("@token", '')
  API.defaults.headers.Authorization = ''

  setIsAdmin(false)
  setLoggedIn(false)
  history.push('/');
  return <p>Logging out...</p>
}