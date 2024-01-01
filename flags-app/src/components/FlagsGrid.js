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
    </span>
    <SearchOutlined />
    </span>
   
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
