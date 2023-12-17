import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import CardDetails from './CardDetails';

const DetailsPage = ({setShouldToggleDarkMode,setIsDarkMode,isDarkMode}) => {
  const { countryCode } = useParams(); // Use the country code as a parameter
  const navigate = useNavigate(); // Get the navigate function

  // Fetch country details based on the countryCode or use a state management library
  // to pass the details from the previous page.

  // Example: Fetch country details using an API
  // const [countryDetails, setCountryDetails] = useState(null);

  // useEffect(() => {
  //   // Fetch country details using the countryCode
  //   // Example API call: axios.get(`/api/countries/${countryCode}`)
  //   // setCountryDetails(response.data);
  // }, [countryCode]);
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
    <div className="details-page">
      {/* Back button */}
      <button onClick={handleBack}>Back</button>

      {/* Check if countryDetails is available */}
      {/* {countryDetails && <CardDetails country={countryDetails} />} */}
      {/* <CardDetails /> */}
    </div>
  );
};

export default DetailsPage;
