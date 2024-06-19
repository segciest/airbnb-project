import React, { useEffect } from 'react';
import Banner from '../../layout/Banner/Banner';
import SearchLocation from '../../layout/SearchLocation/SearchLocation';
import Locate from '../../layout/Locate/Locate';
import CountUp from '../../layout/CountUp/CountUp';
import Blog from '../../layout/Blog/Blog';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from '../../redux/slice/loadingSlice';
import { Loading } from '../../components/Loading/Loading';
const HomePage = () => {
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleTurnOnLoading());
    setTimeout(() => {
      dispatch(handleTurnOffLoading());
    }, 1500);
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      <Banner />
      <SearchLocation />
      <Locate />
      <CountUp />
      <Blog />
    </>
  );
};

export default HomePage;
