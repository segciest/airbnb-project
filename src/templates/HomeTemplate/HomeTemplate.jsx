import { Outlet } from 'react-router-dom';
import Footer from '../../layout/Footer/Footer';
import Header from '../../layout/Header/Header';

const HomeTemplate = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeTemplate;
