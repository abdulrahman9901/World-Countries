// CountryCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


const CountryCard = ({ country ,isDarkMode }) => {
  const navigate = useNavigate();

  const handleCardClick = (countryCode) => {
    // Navigate to the details page when the card is clicked
    navigate(`/details/${countryCode}`);
  };
  return (
  <div onClick={()=>handleCardClick(country.numericCode)} className={isDarkMode ? 'country-card darkHeader' : 'country-card'}>
    <img
      src={country.flags.png}
      alt={country.name}
      className="flag-image"
      crossorigin="anonymous"
    />
    <div className="country-details" >
      <h3>{country.name}</h3><br/>
      <p><strong>Population:</strong> {country.population}</p><br/>
      <p><strong>Region:</strong> {country.region}</p><br/>
      <p><strong>Capital:</strong> {country.capital}</p><br/>
    </div>
  </div>
)};

export default CountryCard;
