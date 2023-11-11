import React from 'react';
import { Routes, Route } from 'react-router';
// import Homepage from './pages/homepage/homepage';
import SignUpPage from './pages/signuppage/signuppage';
import './App.scss';
import RecordedMediaPage from './pages/recorded-media-page/recorded-media-page';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' Component={Homepage}/> */}
        <Route path='/signup' Component={SignUpPage}/>
        <Route path='/' Component={RecordedMediaPage}/>
      </Routes>
    </div>
  );
}

export default App;
