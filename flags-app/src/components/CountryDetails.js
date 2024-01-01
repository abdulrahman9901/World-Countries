import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Image , Button ,Spin } from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

// import CardDetails from './CardDetails';

const DetailsPage = ({setShouldToggleDarkMode,setIsDarkMode,isDarkMode}) => {
  const { countryCode } = useParams(); // Use the country code as a parameter
  const navigate = useNavigate(); // Get the navigate function
  const [countryData, setCountryData] = useState(null);
  const [borderCountryNames, setBorderCountryNames] = useState([]);
  // Fetch country details based on the countryCode or use a state management library
  // to pass the details from the previous page.

  // Example: Fetch country details using an API
  // const [countryDetails, setCountryDetails] = useState(null);

  // useEffect(() => {
  //   // Fetch country details using the countryCode
  //   // Example API call: axios.get(`/api/countries/${countryCode}`)
  //   // setCountryDetails(response.data);
  // }, [countryCode]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data.json`); // Adjust the path based on your project structure
        const data = await response.json();
  
        // Find the country data by country code
        const country = data.find((c) => c.numericCode === countryCode);
  
        if (country) {
          setCountryData(country);
  
          // Fetch details of border countries
          const borderCountryDetails = await Promise.all(
            country.borders.map(async (borderCode) => {
              const borderCountry = data.find((c) => c.alpha3Code === borderCode);
              return borderCountry ? borderCountry.name : null;
            })
          );
  
          // Filter out null values (countries not found)
          const validBorderCountryDetails = borderCountryDetails.filter((borderCountry) => borderCountry !== null);
  
          // Set the names of the border countries in state
          setBorderCountryNames(validBorderCountryDetails);
        } else {
          console.error('Country not found.');
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };
  
    fetchData();
  }, [countryCode]);
   
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // 100% of the viewport height
  };
  if (!countryData) {
    return (   
      <div style={centerStyle}>
      <Spin style={centerStyle} tip="" size="large">
        <div style={centerStyle} className="content" />
      </Spin>
    </div>
  )}
// Set the shouldToggleDarkMode state to false when navigating back
const handleBack = () => {
    // Set shouldToggleDarkMode to false before navigating back
    // You can use this hook in your CountryCard component's onClick event
    setShouldToggleDarkMode(false);
    setIsDarkMode(isDarkMode);
    // Navigate back to the home page
    navigate('/');
  };
  // Return the CardDetails component with fetched details
  return (
    <div className={`details-page ${isDarkMode ? 'dark' : ''}`}>
    {/* Back button */}
    <div className="button-container">
    <Button
     className={isDarkMode ? 'darkHeader' : ''} onClick={handleBack} ><ArrowLeftOutlined /> Back</Button>
    </div>

    {/* Image */}
    <div className="image-container">
      <Image minWidthwidth={'80%'} src={countryData.flags.svg} />
    </div>

    {/* Details */}
    <div className="details-container">
      {/* Render other details as needed */}

      <div className='country-name'><h2>{countryData.name}</h2></div>
      <div className="details" >
        <p ><strong>Native Name:</strong> {countryData.nativeName}</p>
        <p ><strong>Population:</strong> {countryData.population}</p>
        <p ><strong>Region:</strong> {countryData.region}</p>
        <p ><strong>Sub Region:</strong> {countryData.subregion}</p>
        <p ><strong>Capital:</strong> {countryData.capital}</p>
        <p ><strong>Top Level Domain:</strong> {countryData.topLevelDomain[0]}</p>
        <p ><strong>Currencies:</strong> {countryData.currencies && countryData.currencies.map(currency => `${currency.name}`).join(', ')}</p>
        <p ><strong>Languages:</strong> {countryData.languages && countryData.languages.map(lang => `${lang.name}`).join(', ')}</p> 
    </div>
      {/* Add other details here */}
      <div className="country-borders" style={{ display: 'flex', flexDirection: 'row' , placeItems:"center" , flexWrap:'wrap'}}>
      <strong>Border Countries:  </strong>  
      {borderCountryNames.length === 0 ? (
    <p style={{marginLeft:"10px"}}>  No border countries available.</p>
  ) : (
    borderCountryNames.map((borderCountry) => (
      <div className={isDarkMode ? 'darkHeader' : ''} key={borderCountry}
        style={{
          minWidth: '85px',
          width: 'fit-content',
          textAlign: 'center',
          margin: '8px', padding: '5px',
          backgroundColor: 'white'
        }}>
        {borderCountry}
      </div>
    ))
  )}
    </div>
    
    </div>

    
  </div>
  
  );
};

export default DetailsPage;
