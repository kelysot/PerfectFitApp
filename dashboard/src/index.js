import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { DarkModeContextProvider } from './context/darkModeContext';
// import {UserAutContextProvider} from './context/userAutContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <UserAutContextProvider> */}
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
    {/* </UserAutContextProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
