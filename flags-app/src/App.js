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
  const toArray = (htmlCollection) => Array.from(htmlCollection);
  const [shouldToggleDarkMode, setShouldToggleDarkMode] = useState(false);
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    setShouldToggleDarkMode(true);
  };
  
  const toggleDarkModeClasses = (elements, className) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle(className);
    }
  };


useEffect(() => {
  const elmWitchChange = toArray(document.getElementsByClassName('light'));
  const elmWitchChange2 = toArray(document.getElementsByClassName('dark-mode-container'));
  const elmWitchChange3 = toArray(document.getElementsByClassName('header'));
  const elmWitchChange4 = toArray(document.getElementsByClassName('ant-btn'));
  const elmWitchChange5 = toArray(document.getElementsByClassName('searchBar'));
  const elmWitchChange6 = toArray(document.getElementsByClassName('ant-input-group-addon'));
  const elmWitchChange7 = toArray(document.getElementsByClassName('ant-input-lg'));
  const elmWitchChange8 = toArray(document.getElementsByClassName('searchBar'));
  const elmWitchChange9 = toArray(document.getElementsByClassName('ant-dropdown-menu'));

  console.log(shouldToggleDarkMode)

  if (shouldToggleDarkMode) {
  toggleDarkModeClasses(elmWitchChange, 'dark');
  // toggleDarkModeClasses(elmWitchChange2, 'darkHeader');
  // toggleDarkModeClasses(elmWitchChange3, 'darkHeader');
  // toggleDarkModeClasses(elmWitchChange4, 'darkHeader');
  toggleDarkModeClasses(elmWitchChange5, 'darkHeader');
  toggleDarkModeClasses(elmWitchChange6, 'darkHeader');
  toggleDarkModeClasses(elmWitchChange7, 'darkHeader');
  toggleDarkModeClasses(elmWitchChange8, 'darkHeader');
 // toggleDarkModeClasses(elmWitchChange9, 'darkHeader');
  }else {
    toggleDarkModeClasses(elmWitchChange3, 'dark');
    toggleDarkModeClasses(elmWitchChange7, 'darkHeader');
    toggleDarkModeClasses(elmWitchChange6, 'darkHeader');
  }


}, [isDarkMode, shouldToggleDarkMode]);


  return (
    <Routes>
      {/* Route for the home page */}
      <Route path="/" exact element={
      <React.Fragment>
      <div className={`App light ${isDarkMode ? '' : ''}`} >
      <div className= {`dark-mode-container ${isDarkMode ? 'darkHeader':''} `}  style={{display: 'flex', justifyContent: 'space-between',}}>
      <h1 >Where in the world?</h1>

  <div id="dark-mode-btn"  onClick={() =>handleDarkModeToggle()} style={{ display: 'flex', alignItems: 'center', }}>
  <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} title="Switch to Dark mode" />
  <button id="switch"className="theme-switch" type="button" style={{fontFamily:'Nunito Sans' ,marginLeft:'4px',color:`${isDarkMode ? 'white' : 'black'}`}}>{isDarkMode ? 'Light' : 'Dark'} Mode</button>
</div>
</div>
      <FlagsGrid isDarkMode={isDarkMode} />
    </div>
    </React.Fragment>
      }/>

      {/* Additional routes can be added here if needed */}
      <Route path="/details/:countryCode" element={<DetailsPage setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} setShouldToggleDarkMode={setShouldToggleDarkMode} />}/>
      {/* Add a catch-all route for unknown paths */}
      <Route path="*" element={<React.Fragment><div>404 Not Found</div></React.Fragment>}/>

    </Routes>
   
  );
};

export default App;
