// src/components/FlagGrid.js
import React, { useState, useRef , useEffect ,useCallback } from 'react';
import axios from 'axios';
import CountryCard from './CountryCard';
import {SearchOutlined ,DownOutlined} from '@ant-design/icons';
import { Input , Dropdown ,Menu,Space,Button} from 'antd';
const FlagsGrid = ({isDarkMode }) => {
const [countries, setCountries] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [selectedRegion, setSelectedRegion] = useState(null);
const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    // Fetch countries from your API endpoint
    axios.get('./data.json')
      .then(response => {
        setCountries(response.data); // Assuming your API response is an array of countries
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const items = [
    {
      label: 'Africa',
      key: '1',
    },
    {
      label: 'Americas',
      key: '2',
    }, {
      label: 'Asia',
      key: '3',
    }, {
      label: 'Europe',
      key: '4',
    }, {
      label: 'Oceania',
      key: '5',
    },
    {
      label: 'World',
      key: '6',
    },
  ];

  const getLabelForSelectedRegion = (selectedRegion) => { 
    const selectedRegionItem = items.find(item => item.key === selectedRegion);
    console.log(selectedRegionItem)
    prevSelectedRegion.current = selectedRegion;
    return selectedRegionItem ? selectedRegionItem.label : 'All Regions';
  };
 // Update the selected region when an item is clicked in the dropdown menu
const handleMenuClick = ({ key }) => { 
  
  setSelectedRegion(key === '' ? selectedRegion : getLabelForSelectedRegion(key));
};

const prevSelectedRegion = useRef();
// Update filtered countries when search term or selected region changes
useEffect(() => {
  
  // Preserve the previous selectedRegion value
  prevSelectedRegion.current = selectedRegion;
  const updatedFilteredCountries = countries
    .filter(country => country.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
    .filter(country => !selectedRegion || selectedRegion === 'World' || country.region === selectedRegion)
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((country, index, self) => index === self.findIndex(c => c.name === country.name));
    console.log(updatedFilteredCountries,searchTerm,selectedRegion , prevSelectedRegion.current)

  setFilteredCountries(updatedFilteredCountries);
}, [searchTerm, selectedRegion, countries]);

const menu = (
  <Menu style={{fontFamily: 'Nunito Sans' , }}  className={` ${isDarkMode ? 'darkHeader' : ''}`} onClick={handleMenuClick}>
    {items.map(item => (
      <Menu.Item key={item.key} className={` ${isDarkMode ? 'darkHeader' : ''}`} >
        {item.label}
      </Menu.Item>
    ))}
  </Menu>
);

return (
  <>
  <div>
  <div className={`flags-grid header  ${isDarkMode ? 'dark' : ''} `} style={{margin:'auto' , maxWidth :"1200px" , display: 'grid', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
    {/* <Input
      className={`searchBar ${isDarkMode ? 'darkHeader' : ''}`}
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      size="large" 
      addonBefore={<SearchOutlined />}
      onChange={(e) => { setSearchTerm(e.target.value)}}
      style={{color: `${isDarkMode ? 'white ' : 'black'}`,backgroundColor:`${isDarkMode ? '#2B3743 ' : 'white'}`, minWidth: '300px' , maxWidth:'370px', gridColumnStart: '1' , gridColumnEnd: '2'}} 
      /> */}
<span className={`${isDarkMode ? 'darkHeader' : ''} ant-input-group-wrapper searchBar ant-input-group-wrapper-lg css-dev-only-do-not-override-1g853jt`} style={{color: "black", backgroundColor: 'white', minWidth: '300px', maxWidth: '370px', gridColumn: '1 / 2'}}>
<span className={`ant-input-wrapper ant-input-group css-dev-only-do-not-override-1g853jt ${isDarkMode ? 'darkHeader' : ''}`}>
<span  className={`ant-input-group-addon  ${isDarkMode ? 'darkHeader' : ''}`}>
  <span role="img" aria-label="search" className={`anticon anticon-search ${isDarkMode ? 'darkHeader' : ''}`}>
    <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></span></span>
    <Input
      className={`searchBar ${isDarkMode ? 'darkHeader' : ''}`}
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      size="large" 
      onChange={(e) => { setSearchTerm(e.target.value)}}
      />
    </span>
    </span>

      <Dropdown
       className = {`dropdownMen`}
       overlay={menu}
       trigger={['click']}
       style={{justifyContent:'end' , Height :'40px' , gridColumnStart: '-2',backgroundColor: isDarkMode ? '#2B3743' : 'white',
       color: isDarkMode ? 'white' : 'black',
       border: 'none',
       outline: 'none',}}
       menu
      placement="bottom"
      >
      <Button style={{gridColumnStart: '-2' ,justifySelf:'end', width:'max-content', justifyContent:'end' , Height :'40px', color: isDarkMode ? 'white' : 'black', backgroundColor: isDarkMode ? '#2B3743' : 'white' }}>  Filter by region  <DownOutlined />
</Button>
      </Dropdown>

    </div>
        <div className={`flags-grid  ${isDarkMode ? 'dark' : ''}`} style={{paddingRight:'20px'}}>
        {filteredCountries.map(country => (
          <CountryCard  key={country.numericCode} country={country} isDarkMode={isDarkMode}/>
        ))}
      </div>

  </div>
  </>
);

};

export default FlagsGrid;
