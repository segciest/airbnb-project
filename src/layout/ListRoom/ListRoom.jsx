import React from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../Banner/Banner';
import SearchLocation from '../SearchLocation/SearchLocation';
import DetailsList from '../DetailsList/DetailsList';

const ListRoom = () => {
  const { maViTri } = useParams();
  console.log(maViTri);
  return (
    <>
      <Banner />
      <SearchLocation />
      <DetailsList />
    </>
  );
};

export default ListRoom;
