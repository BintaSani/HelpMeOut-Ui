import React from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './pages/homepage/homepage';
import SignUpPage from './pages/signuppage/signuppage';
import './App.scss';
import RecordedMediaPage from './pages/recorded-media-page/recorded-media-page';
import LibraryPage from './pages/library/library';
import ViewPage from './pages/view/viewpage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Homepage}/>
        <Route path='/signup' Component={SignUpPage}/>
        <Route path='/playback' Component={RecordedMediaPage}/>
        <Route path='/library' Component={LibraryPage}/>
        <Route path='/library/video/' Component={ViewPage}/>
      </Routes>
    </div>
  );
}

export default App;
