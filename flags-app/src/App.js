// src/App.js
import React from 'react';
import FlagsGrid from './components/FlagsGrid';
import DetailsPage from './components/CountryDetails';

import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect ,useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  

  return (
      <div className={`App  ${isDarkMode ? 'dark' : ''}`} >
      <div className= {`dark-mode-container ${isDarkMode ? 'darkHeader':''} `}  style={{display: 'flex', justifyContent: 'space-between',}}>
      <h1 >Where in the world?</h1>

  <div id="dark-mode-btn" className={`${isDarkMode ? 'darkHeader':''}`} onClick={() =>handleDarkModeToggle()} style={{ display: 'flex', alignItems: 'center', }}>
  <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} title="Switch to Dark mode" />
  <button id="switch"className="theme-switch" type="button" style={{fontFamily:'Nunito Sans' ,marginLeft:'4px',color:`${isDarkMode ? 'white' : 'black'}`}}>{isDarkMode ? 'Light' : 'Dark'} Mode</button>
</div>
</div>
    <Routes>
      {/* Route for the home page */}
      <Route path="/" exact element={
      <FlagsGrid isDarkMode={isDarkMode} />
      }/>

      {/* Additional routes can be added here if needed */}
      <Route path="/details/:countryCode" element={<DetailsPage setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}  />}/>
      {/* Add a catch-all route for unknown paths */}
      <Route path="*" element={<React.Fragment><div>404 Not Found</div></React.Fragment>}/>

    </Routes>
    </div>
  );
};

export default App;
