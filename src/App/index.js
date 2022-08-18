import React from 'react';
import { TareaProvider } from '../TareaContext';
import { AppUI } from './AppUI';
import Login from '../Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <TareaProvider>
        <Routes>
          <Route exact path="/" element={<AppUI/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </TareaProvider>
    </Router>
    
  );
}

export default App;
