// CountryCard.js
import React , {useState , useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Spin } from 'antd';

const CountryCard = ({ country ,isDarkMode }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [processedImage, setProcessedImage] = useState(null);
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh', // 20% of the viewport height
  };
  useEffect(() => {
    const processImage = async () => {
      try {
        const response = await axios.post('https://world-countries-api-nine.vercel.app/process-image', { url: country.flags.png }, { responseType: 'arraybuffer' });
 
         // Convert binary data to Uint8Array
    const uint8Array = new Uint8Array(response.data);

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'image/png' });

    // Create a data URL from the Blob
    const dataUrl = URL.createObjectURL(blob);
       
        // const processedImageData = new ArrayBuffer(response.data, 'binary').toString('base64');
        setProcessedImage(`${dataUrl}`);
        setIsLoading(false);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    };

    processImage();
  }, [country.flags.png]);

  const handleCardClick = (countryCode) => {
    // Navigate to the details page when the card is clicked
    navigate(`/details/${countryCode}`);
  };
  return (
  <div onClick={()=>handleCardClick(country.numericCode)} className={isDarkMode ? 'country-card darkHeader' : 'country-card'}>
       {isLoading ? (
          <div style={centerStyle}>
          <Spin style={centerStyle} tip="" >
            <div style={centerStyle} className="content" />
          </Spin>
        </div>
      ) : (
        processedImage && (
          <img
            src={processedImage}
            alt={country.name}
            className="flag-image"
            crossOrigin="anonymous"
          />
        )
      )}
    <div className="country-details" >
      <h3>{country.name}</h3><br/>
      <p><strong>Population:</strong> {country.population}</p><br/>
      <p><strong>Region:</strong> {country.region}</p><br/>
      <p><strong>Capital:</strong> {country.capital}</p><br/>
    </div>
  </div>
)};

export default CountryCard;
