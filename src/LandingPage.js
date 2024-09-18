import React from 'react';
import { useHistory } from 'react-router-dom';
import SearchSection from '../src/components/SearchSection';
 import Navbar from '../src/components/Navbar';
 import { useLocation } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();

  const location = useLocation();
  const { selectedState, selectedCity } = location.state;

  const handleSearch = (state, city) => {
    history.push({
      pathname: '/results',
      state: { selectedState: state, selectedCity: city }
    });
  };

  return (
    <div>
      <Navbar />
      <SearchSection onSearch={handleSearch} />
      <SearchSection selectedState={selectedState} selectedCity={selectedCity} />
    </div>
  );
};

export default LandingPage;