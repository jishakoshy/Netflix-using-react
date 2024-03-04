import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import './Components/NavBar/NavBar.css';
import Banner from './Components/Banner/Banner';
import  './Components/Banner/Banner.css';
import RowPost from './Components/RowPost/RowPost';
import './Components/RowPost/RowPost.css';

import {action,originals} from './urls'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Banner/>
      <RowPost url={originals} title='Netflix Originals'/> 
      <RowPost url={action} title='Action' isSmall={true}/>
    </div>
  );
}

export default App;
