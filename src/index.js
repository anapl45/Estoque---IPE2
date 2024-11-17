import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Estoque from './pages/Estoque';
import ItensCaut from './pages/ItensCaut';
import { AppProvider } from './Context/appContext';
import Cautela from './pages/Cautela';
import Perms from './pages/Perms';
import Cautelas from './pages/Cautelas';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/Cadastro",
    element: <Cadastro/>
  },
  {
    path: "/Estoque",
    element: <Estoque />
  },
  {
    path: "/ItensCaut",
    element: <ItensCaut/>
  },
  {
    path: "/Cautela",
    element: <Cautela/>
  },
  {
    path: "/Perms",
    element: <Perms/>
  },
  {
    path: "/Cautelas",
    element: <Cautelas/>
  },

])
root.render(
  <React.StrictMode>
    <AppProvider>
        <RouterProvider router={router}/>
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
