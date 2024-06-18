import React from 'react';
import Banner from '../../layout/Banner/Banner';
import SearchLocation from '../../layout/SearchLocation/SearchLocation';
import Locate from '../../layout/Locate/Locate';
import CountUp from '../../layout/CountUp/CountUp';
import Blog from '../../layout/Blog/Blog';
const HomePage = () => {
  return (
    <>
      <Banner />
      <SearchLocation />
      <Locate />
      <CountUp />
      <Blog />
    </>
  );
};

export default HomePage;
