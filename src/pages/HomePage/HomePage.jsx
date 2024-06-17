import React from 'react';
import Banner from '../../layout/Banner/Banner';
import SearchLocation from '../../layout/SearchLocation/SearchLocation';
import Locate from '../../layout/Locate/Locate';
import CountUp from '../../layout/CountUp/CountUp';
const HomePage = () => {
  return (
    <>
      <Banner />
      <SearchLocation />
      <Locate />
      <CountUp />
    </>
  );
};

export default HomePage;
