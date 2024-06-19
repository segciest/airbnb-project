import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from '../../redux/slice/loadingSlice';
import { Loading } from '../../components/Loading/Loading';

const ChatTemplate = () => {
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
      <Outlet />
    </>
  );
};

export default ChatTemplate;
