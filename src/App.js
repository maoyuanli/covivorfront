import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/navbar";
import Landing from "./components/landing";

export const App = () => {
  return (
      <Fragment>
        <Navbar/>
        <Landing/>
      </Fragment>
  );
}

export default App;
