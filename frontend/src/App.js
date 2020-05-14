import React, { Component } from 'react';
import Main from './components/MainComponent';
import logo from './logo.svg';
import Hello from './components/Helloworld';
import './App.css';
import { Brouser, Router, BrowserRouter } from 'react-router-dom';

class App extends Component {


  render(){
    return (
  
        <BrowserRouter>
        <div className = "App">
          <Main />
        </div>
        </BrowserRouter>
   
    );
  }
}

export default App;
