import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../layout/Footer/Footer';
import Header from '../../layout/Header/Header';

const ListRoomTemplate = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default ListRoomTemplate;
