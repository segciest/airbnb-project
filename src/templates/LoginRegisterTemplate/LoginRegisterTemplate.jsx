import React, { useEffect } from 'react';
import Header from '../../layout/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../../layout/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from '../../redux/slice/loadingSlice';
import { Loading } from '../../components/Loading/Loading';

const LoginRegisterTemplate = () => {
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleTurnOnLoading());
    setTimeout(() => {
      dispatch(handleTurnOffLoading());
    }, 2000);
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default LoginRegisterTemplate;
