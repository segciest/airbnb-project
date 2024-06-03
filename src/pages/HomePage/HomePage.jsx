import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  handleTurnOnLoading,
  handleTurnOffLoading,
} from "../../redux/slice/loadingSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleTurnOnLoading());
    dispatch(handleTurnOffLoading());
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
