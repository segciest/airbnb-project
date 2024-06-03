import Header from "../../layout/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../layout/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from "../../redux/slice/loadingSlice";

const HomeTemplate = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleTurnOnLoading());
    dispatch(handleTurnOffLoading());
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeTemplate;
