import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'


import HomePage from "./HomePage";
import UsuarioPage from './usuario/UsuarioPage'
import MainContext from './utils/MainContext'
import API from "./utils/API"


// ========================== App ==========================
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("@token"));

    if (localToken) {
      API.defaults.headers.Authorization = `Bearer ${localToken}`;
      setLoggedIn(true)
    }
    setIsLoading(false);
  }, []);

  const contextValues = { loggedIn, setLoggedIn, token, setToken, isLoading, setIsLoading, isAdmin, setIsAdmin }
  return (
    <>
      <MainContext.Provider value={contextValues}>
        <BrowserRouter>
          <Switch>
            <RouteGuard exact path='/' component={HomePage} />
            <RouteGuard privateRoute exact path='/user' component={UsuarioPage} />
            <AdminGuard adminRoute exact path='/admin' component={UsuarioPage} />
          </Switch>
        </BrowserRouter>
      </MainContext.Provider>
    </>
  )
}


// ========================== RouteGuard ==========================
function RouteGuard(props) {
  const { privateRoute, ...args } = props;
  const { loggedIn, isLoading } = useContext(MainContext);
  if (isLoading) {
    console.log("Lendo o storage. Destino:", args.path);
    return <h3>Carregando...</h3>;
  }

  if (privateRoute && !loggedIn)
    return <Redirect to="/" />;

  return <Route {...args} />;
}


// ========================== AdminGuard ==========================
function AdminGuard(props) {
  const { adminRoute, ...args } = props;
  const { isLoading, isAdmin } = useContext(MainContext);
  if (isLoading) {
    console.log("Lendo o storage. Destino:", args.path);
    return <h3>Carregando...</h3>;
  }

  if (adminRoute && !isAdmin)
    return <Redirect to="/" />;

  return <Route {...args} />;
}